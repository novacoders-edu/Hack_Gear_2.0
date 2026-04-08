"use client";

import React, { useState, useEffect, Suspense, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

function AdminPanel() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [activeTab, setActiveTab] = useState("core-team");
    const [data, setData] = useState([]);
    const [psData, setPsData] = useState([]);
    const [pwData, setPwData] = useState([]); // Past Winners Data
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});

    const tabs = useMemo(() => [
        { id: "core-team", label: "Core Team", endpoint: "/api/core-team" },
        { id: "judges", label: "Judges", endpoint: "/api/judges" },
        { id: "problem-statements", label: "Problem Statements", endpoint: "/api/problem-statements" },
        { id: "past-winners", label: "Past Winners", endpoint: "/api/past-winners" }
    ], []);

    const getCurrentEndpoint = useCallback(() => {
        return tabs.find((tab) => tab.id === activeTab)?.endpoint;
    }, [activeTab, tabs]);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await fetch("/api/admin/verify", {
                    credentials: "include",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });

                const result = await res.json();
                console.log("result in cntent : ", result)
                if (!result.success) {
                    router.push("/"); // Redirect to `/` if token is invalid
                }
            } catch (error) {
                console.error("Token verification failed:", error);
                router.push("/"); // Redirect to `/` on error
            }
        };

        verifyToken();
    }, [searchParams, router]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(getCurrentEndpoint(), {
                headers: {
                    "hg-api-token": process.env.NEXT_PUBLIC_HS_API_TOKEN
                }
            });
            const result = await res.json();
            console.log("fetch result : ", result)

            // Route data to appropriate state based on active tab
            if (activeTab === "problem-statements") {
                setPsData(Array.isArray(result) ? result : result.data || []);
            } else if (activeTab === "past-winners") {
                setPwData(Array.isArray(result) ? result : result.data || []);
            } else {
                // Use data for core-team and judges
                if (result.success) {
                    setData(result.data);
                } else {
                    setData(Array.isArray(result) ? result : []);
                }
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
            if (activeTab === "problem-statements") {
                setPsData([]);
            } else if (activeTab === "past-winners") {
                setPwData([]);
            } else {
                setData([]);
            }
        } finally {
            setLoading(false);
        }
    }, [activeTab, getCurrentEndpoint]);

    useEffect(() => {
        fetchData()
    }, [activeTab,fetchData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayInputChange = (field, index, value) => {
        setFormData((prev) => {
            const array = [...(prev[field] || [])];
            array[index] = value;
            return { ...prev, [field]: array };
        });
    };

    const handleSocialChange = (index, field, value) => {
        setFormData((prev) => {
            const socials = [...(prev.socials || [])];
            socials[index] = { ...socials[index], [field]: value };
            return { ...prev, socials };
        });
    };

    const addArrayField = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...(prev[field] || []), ""]
        }));
    };

    const removeArrayField = (field, index) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const addSocialField = () => {
        setFormData((prev) => ({
            ...prev,
            socials: [...(prev.socials || []), { platform: "", url: "" }]
        }));
    };

    const removeSocialField = (index) => {
        setFormData((prev) => ({
            ...prev,
            socials: prev.socials.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint = getCurrentEndpoint();
            const url = editingId ? `${endpoint}/${editingId}` : endpoint;
            const method = editingId ? "PUT" : "POST";

            // Prepare data based on active tab
            let submitData = { ...formData };

            // For problem statements, ensure all required fields are present
            if (activeTab === "problem-statements") {
                // Set default color scheme if not selected
                if (!submitData.hexColor) {
                    submitData = {
                        ...submitData,
                        color: "border-cyan-neon",
                        accent: "text-cyan-neon",
                        bgColor: "bg-cyan-neon",
                        shadowColor: "shadow-cyan-neon",
                        hexColor: "#00E0FF"
                    };
                }

                // Ensure resources is an array
                if (!submitData.resources) {
                    submitData.resources = [];
                }

                // Set default icon if empty
                if (!submitData.icon) {
                    submitData.icon = "🔥"; // Keep as fallback for now
                }
            }

            // For past winners, ensure required fields
            if (activeTab === "past-winners") {
                // Ensure members is an array
                if (!submitData.members) {
                    submitData.members = [];
                }

                // Ensure rank and achievement are set based on position
                if (submitData.position && !submitData.rank) {
                    switch (submitData.position) {
                        case "1st Place":
                            submitData.rank = 1;
                            submitData.achievement = "FIRST_PLACE";
                            break;
                        case "2nd Place":
                            submitData.rank = 2;
                            submitData.achievement = "SECOND_PLACE";
                            break;
                        case "3rd Place":
                            submitData.rank = 3;
                            submitData.achievement = "THIRD_PLACE";
                            break;
                        case "Best Girls Team":
                            submitData.rank = 4;
                            submitData.achievement = "BEST_GIRLS_TEAM";
                            break;
                    }
                }
            }

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "hg-api-token": process.env.NEXT_PUBLIC_HS_API_TOKEN
                },
                body: JSON.stringify(submitData),
            });

            if (res.ok) {
                alert(editingId ? "Updated successfully!" : "Added successfully!");
                resetForm();
                fetchData();
            } else {
                const errorData = await res.json();
                console.error("Error response:", errorData);
                alert(`Failed to save data: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Error saving data");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setIsEditing(true);
        setEditingId(item._id);

        // Ensure all fields are properly populated
        const editData = { ...item };

        // For problem statements, ensure color fields exist
        if (activeTab === "problem-statements") {
            if (!editData.color) editData.color = "border-cyan-neon";
            if (!editData.accent) editData.accent = "text-cyan-neon";
            if (!editData.bgColor) editData.bgColor = "bg-cyan-neon";
            if (!editData.shadowColor) editData.shadowColor = "shadow-cyan-neon";
            if (!editData.hexColor) editData.hexColor = "#00E0FF";
            if (!editData.resources) editData.resources = [];
        }

        // For past winners, ensure required fields
        if (activeTab === "past-winners") {
            if (!editData.members) editData.members = [];
            if (!editData.year) editData.year = new Date().getFullYear();
        }

        // For other tabs, ensure socials array exists
        if (activeTab === "core-team" || activeTab === "judges") {
            if (!editData.socials) editData.socials = [];
        }

        setFormData(editData);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        setLoading(true);
        try {
            const res = await fetch(`${getCurrentEndpoint()}/${id}`, {
                method: "DELETE",
                headers: {
                    "hg-api-token": process.env.NEXT_PUBLIC_HS_API_TOKEN
                }
            });

            if (res.ok) {
                alert("Deleted successfully!");
                fetchData();
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            console.error("Error deleting:", error);
            alert("Error deleting");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData({});
    };

    const renderForm = () => {
        switch (activeTab) {
            case "core-team":
                return (
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />
                        <input
                            type="text"
                            name="role"
                            placeholder="Role"
                            value={formData.role || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />
                        <input
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            value={formData.image || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />
                        <textarea
                            name="bio"
                            placeholder="Bio"
                            value={formData.bio || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            rows="3"
                            required
                        />
                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={formData.department || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />

                        <div className="border border-neutral-700 p-4">
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-white font-bold">Social Links</label>
                                <button
                                    type="button"
                                    onClick={addSocialField}
                                    className="px-3 py-1 bg-cyan-600 text-white text-sm"
                                >
                                    + Add Social
                                </button>
                            </div>
                            {(formData.socials || []).map((social, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Platform (e.g., linkedin)"
                                        value={social.platform || ""}
                                        onChange={(e) =>
                                            handleSocialChange(index, "platform", e.target.value)
                                        }
                                        className="flex-1 p-2 bg-neutral-900 border border-neutral-700 text-white"
                                    />
                                    <input
                                        type="text"
                                        placeholder="URL"
                                        value={social.url || ""}
                                        onChange={(e) =>
                                            handleSocialChange(index, "url", e.target.value)
                                        }
                                        className="flex-1 p-2 bg-neutral-900 border border-neutral-700 text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSocialField(index)}
                                        className="px-3 py-2 bg-red-600 text-white"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "judges":
                return (
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />
                        <input
                            type="text"
                            name="role"
                            placeholder="Role"
                            value={formData.role || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />
                        <input
                            type="text"
                            name="company"
                            placeholder="Company"
                            value={formData.company || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />
                        <input
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            value={formData.image || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />
                        <textarea
                            name="bio"
                            placeholder="Bio"
                            value={formData.bio || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            rows="3"
                            required
                        />

                        <div className="border border-neutral-700 p-4">
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-white font-bold">Social Links</label>
                                <button
                                    type="button"
                                    onClick={addSocialField}
                                    className="px-3 py-1 bg-purple-600 text-white text-sm"
                                >
                                    + Add Social
                                </button>
                            </div>
                            {(formData.socials || []).map((social, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Platform"
                                        value={social.platform || ""}
                                        onChange={(e) =>
                                            handleSocialChange(index, "platform", e.target.value)
                                        }
                                        className="flex-1 p-2 bg-neutral-900 border border-neutral-700 text-white"
                                    />
                                    <input
                                        type="text"
                                        placeholder="URL"
                                        value={social.url || ""}
                                        onChange={(e) =>
                                            handleSocialChange(index, "url", e.target.value)
                                        }
                                        className="flex-1 p-2 bg-neutral-900 border border-neutral-700 text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSocialField(index)}
                                        className="px-3 py-2 bg-red-600 text-white"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "problem-statements":
                const colorOptions = [
                    {
                        name: "Cyan Neon",
                        color: "border-cyan-neon",
                        accent: "text-cyan-neon",
                        bgColor: "bg-cyan-neon",
                        shadowColor: "shadow-cyan-neon",
                        hexColor: "#00E0FF"
                    },
                    {
                        name: "Purple Neon",
                        color: "border-purple-neon",
                        accent: "text-purple-neon",
                        bgColor: "bg-purple-neon",
                        shadowColor: "shadow-purple-neon",
                        hexColor: "#B026FF"
                    },
                    {
                        name: "Pink Neon",
                        color: "border-pink-neon",
                        accent: "text-pink-neon",
                        bgColor: "bg-pink-neon",
                        shadowColor: "shadow-pink-neon",
                        hexColor: "#FF006E"
                    },
                    {
                        name: "Green Neon",
                        color: "border-green-neon",
                        accent: "text-green-neon",
                        bgColor: "bg-green-neon",
                        shadowColor: "shadow-green-neon",
                        hexColor: "#39FF14"
                    },
                    {
                        name: "Orange Neon",
                        color: "border-orange-neon",
                        accent: "text-orange-neon",
                        bgColor: "bg-orange-neon",
                        shadowColor: "shadow-orange-neon",
                        hexColor: "#FF6600"
                    },
                    {
                        name: "Yellow Neon",
                        color: "border-yellow-neon",
                        accent: "text-yellow-neon",
                        bgColor: "bg-yellow-neon",
                        shadowColor: "shadow-yellow-neon",
                        hexColor: "#FFFF00"
                    }
                ];

                const handleColorSelect = (colorOption) => {
                    setFormData(prev => ({
                        ...prev,
                        color: colorOption.color,
                        accent: colorOption.accent,
                        bgColor: colorOption.bgColor,
                        shadowColor: colorOption.shadowColor,
                        hexColor: colorOption.hexColor
                    }));
                };

                return (
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="id"
                            placeholder="ID (e.g., TRK_01) - Auto-generated if empty"
                            value={formData.id || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                        />
                        <select
                            name="tag"
                            value={formData.tag || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        >
                            <option value="" disabled>Select Tag</option>
                            <option value="AI/ML">AI/ML</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Blockchain">Blockchain</option>
                            <option value="Game Development">Open Innovation</option>
                        </select>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            rows="4"
                            required
                        />
                        {/* Color Theme Selection */}
                        <div className="border border-neutral-700 p-4">
                            <label className="text-white font-bold mb-3 block">
                                Select Color Theme <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {colorOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleColorSelect(option)}
                                        className={`flex items-center gap-3 p-3 border-2 transition-all ${formData.hexColor === option.hexColor
                                            ? "border-white bg-neutral-800"
                                            : "border-neutral-700 bg-neutral-900 hover:border-neutral-500"
                                            }`}
                                    >
                                        <div
                                            className="w-8 h-8 rounded border-2"
                                            style={{
                                                backgroundColor: option.hexColor,
                                                boxShadow: `0 0 10px ${option.hexColor}`
                                            }}
                                        />
                                        <span className="text-white text-sm font-medium">
                                            {option.name}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Show selected color details */}
                            {formData.hexColor && (
                                <div className="mt-4 p-3 bg-black border border-neutral-700">
                                    <p className="text-xs text-neutral-400 mb-2">Selected Colors:</p>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <span className="text-neutral-500">Border:</span>
                                            <code className="ml-2 text-cyan-neon">{formData.color}</code>
                                        </div>
                                        <div>
                                            <span className="text-neutral-500">Text:</span>
                                            <code className="ml-2 text-cyan-neon">{formData.accent}</code>
                                        </div>
                                        <div>
                                            <span className="text-neutral-500">Background:</span>
                                            <code className="ml-2 text-cyan-neon">{formData.bgColor}</code>
                                        </div>
                                        <div>
                                            <span className="text-neutral-500">Shadow:</span>
                                            <code className="ml-2 text-cyan-neon">{formData.shadowColor}</code>
                                        </div>
                                        <div>
                                            <span className="text-neutral-500">Hex:</span>
                                            <code className="ml-2 text-cyan-neon">{formData.hexColor}</code>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <input
                            type="text"
                            name="icon"
                            placeholder="Icon (emoji, e.g., 🤖 🧠)"
                            value={formData.icon || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                        />

                        <div className="border border-neutral-700 p-4">
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-white font-bold">Resources</label>
                                <button
                                    type="button"
                                    onClick={() => addArrayField("resources")}
                                    className="px-3 py-1 bg-cyan-600 text-white text-sm"
                                >
                                    + Add Resource
                                </button>
                            </div>
                            {(formData.resources || []).map((resource, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Resource URL or text"
                                        value={resource}
                                        onChange={(e) =>
                                            handleArrayInputChange("resources", index, e.target.value)
                                        }
                                        className="flex-1 p-2 bg-neutral-900 border border-neutral-700 text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayField("resources", index)}
                                        className="px-3 py-2 bg-red-600 text-white"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "past-winners":
                return (
                    <div className="space-y-4">
                        <input
                            type="number"
                            name="year"
                            placeholder="Year (e.g., 2024)"
                            value={formData.year || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />
                        <input
                            type="text"
                            name="teamName"
                            placeholder="Team Name"
                            value={formData.teamName || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />

                        <select
                            name="position"
                            value={formData.position || "1st Place"}
                            onChange={(e) => {
                                const position = e.target.value;
                                let rank = 1;
                                let achievement = "FIRST_PLACE";

                                switch (position) {
                                    case "1st Place":
                                        rank = 1;
                                        achievement = "FIRST_PLACE";
                                        break;
                                    case "2nd Place":
                                        rank = 2;
                                        achievement = "SECOND_PLACE";
                                        break;
                                    case "3rd Place":
                                        rank = 3;
                                        achievement = "THIRD_PLACE";
                                        break;
                                    case "Best Girls Team":
                                        rank = 4;
                                        achievement = "BEST_GIRLS_TEAM";
                                        break;
                                }

                                setFormData(prev => ({
                                    ...prev,
                                    position,
                                    rank,
                                    achievement
                                }));
                            }}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        >
                            <option value="1st Place">1st Place</option>
                            <option value="2nd Place">2nd Place</option>
                            <option value="3rd Place">3rd Place</option>
                            <option value="Best Girls Team">Best Girls Team</option>
                        </select>

                        <input
                            type="text"
                            name="image"
                            placeholder="Image URL (e.g., /pastHeros/team-1.jpg)"
                            value={formData.image || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />

                        <input
                            type="text"
                            name="project"
                            placeholder="Project Name"
                            value={formData.project || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />

                        <input
                            type="text"
                            name="college"
                            placeholder="College Name"
                            value={formData.college || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            required
                        />

                        <input
                            type="text"
                            name="prize"
                            placeholder="Prize Amount (e.g., ₹50,000)"
                            value={formData.prize || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                        />

                        <textarea
                            name="bio"
                            placeholder="Team Bio / Project Description"
                            value={formData.bio || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            rows="3"
                        />

                        <textarea
                            name="description"
                            placeholder="Additional Description"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-neutral-900 border border-neutral-700 text-white"
                            rows="3"
                        />

                        <div className="border border-neutral-700 p-4">
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-white font-bold">Team Members</label>
                                <button
                                    type="button"
                                    onClick={() => addArrayField("members")}
                                    className="px-3 py-1 bg-cyan-600 text-white text-sm"
                                >
                                    + Add Member
                                </button>
                            </div>
                            {(formData.members || []).map((member, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Member Name"
                                        value={member}
                                        onChange={(e) =>
                                            handleArrayInputChange("members", index, e.target.value)
                                        }
                                        className="flex-1 p-2 bg-neutral-900 border border-neutral-700 text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayField("members", index)}
                                        className="px-3 py-2 bg-red-600 text-white"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Display selected position info */}
                        {formData.position && (
                            <div className="p-3 bg-black border border-neutral-700">
                                <p className="text-xs text-neutral-400 mb-2">Selected Position:</p>
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                    <div>
                                        <span className="text-neutral-500">Position:</span>
                                        <code className="ml-2 text-cyan-neon">{formData.position}</code>
                                    </div>
                                    <div>
                                        <span className="text-neutral-500">Rank:</span>
                                        <code className="ml-2 text-cyan-neon">{formData.rank}</code>
                                    </div>
                                    <div>
                                        <span className="text-neutral-500">Achievement:</span>
                                        <code className="ml-2 text-cyan-neon">{formData.achievement}</code>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    // Get current data based on active tab
    const getCurrentData = () => {
        if (activeTab === "problem-statements") {
            return psData;
        } else if (activeTab === "past-winners") {
            return pwData;
        } else {
            return data;
        }
    };

    return (
        <section className="min-h-screen py-16 bg-cyber-black">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="heading-font text-4xl md:text-6xl font-black text-white uppercase mb-2">
                        ADMIN PANEL<span className="text-cyan-neon">.</span>
                    </h1>
                    <p className="sub-font text-neutral-400">
                        Manage all content from one place
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                resetForm();
                            }}
                            className={`px-6 py-3 font-bold uppercase text-sm transition-all ${activeTab === tab.id
                                ? "bg-cyan-neon text-black"
                                : "bg-neutral-900 text-white hover:bg-neutral-800"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <div className="bg-neutral-900 border border-neutral-800 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                {isEditing ? "Edit" : "Add New"}
                            </h2>
                            {isEditing && (
                                <button
                                    onClick={resetForm}
                                    className="px-4 py-2 bg-neutral-700 text-white flex items-center gap-2"
                                >
                                    <FaTimes /> Cancel
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit}>
                            {renderForm()}

                            <div className="flex gap-4 mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-6 py-3 bg-cyan-neon text-black font-bold uppercase flex items-center justify-center gap-2 hover:bg-cyan-400 transition disabled:opacity-50"
                                >
                                    <FaSave /> {loading ? "Saving..." : isEditing ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Data List */}
                    <div className="bg-neutral-900 border border-neutral-800 p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Current Items ({getCurrentData().length})
                        </h2>

                        {loading ? (
                            <p className="text-white">Loading...</p>
                        ) : getCurrentData().length === 0 ? (
                            <p className="text-neutral-400">No items found</p>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                {getCurrentData().map((item) => (
                                    <div
                                        key={item._id}
                                        className="bg-black border border-neutral-700 p-4"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1">
                                                <h3 className="text-white font-bold">
                                                    {item.name || item.title || item.teamName}
                                                </h3>
                                                <p className="text-sm text-neutral-400">
                                                    {item.role || item.project || item.tag || item.description?.substring(0, 50)}
                                                </p>
                                                {activeTab === "problem-statements" && item.hexColor && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <div
                                                            className="w-4 h-4 rounded"
                                                            style={{ backgroundColor: item.hexColor }}
                                                        />
                                                        <span className="text-xs text-neutral-500">{item.id || "No ID"}</span>
                                                    </div>
                                                )}
                                                {activeTab === "past-winners" && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-xs px-2 py-1 bg-cyan-neon text-black font-bold">
                                                            {item.position}
                                                        </span>
                                                        <span className="text-xs text-neutral-500">
                                                            {item.year} • {item.college}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="px-3 py-2 bg-cyan-600 text-white hover:bg-cyan-700"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="px-3 py-2 bg-red-600 text-white hover:bg-red-700"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminPanel />
        </Suspense>
    )
}
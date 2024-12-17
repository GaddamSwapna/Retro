import React, { useState } from 'react';

function Guidhub() {
  // Sample data for different types of resources
  const resources = [
    {
      id: 1,
      title: 'How to Restore Old Consoles',
      description: 'A complete guide to restoring old gaming consoles to their original condition.',
      category: 'Restoration Tutorial',
      content: 'Step-by-step guide on restoring retro gaming consoles...',
    },
    {
      id: 2,
      title: 'Console Maintenance Tips',
      description: 'Tips for maintaining your retro gaming consoles to ensure longevity.',
      category: 'Maintenance Tip',
      content: 'Best practices for keeping your console in top shape...',
    },
    {
      id: 3,
      title: 'History of Retro Gaming Consoles',
      description: 'An article about the history and evolution of retro gaming consoles.',
      category: 'Historical Article',
      content: 'A look back at the development of classic gaming consoles...',
    },
    {
      id: 4,
      title: 'The Best Collector Guides for Retro Games',
      description: 'A comprehensive guide to collecting retro gaming consoles and games.',
      category: 'Collector Guide',
      content: 'Essential tips for starting your retro gaming collection...',
    },
    {
      id: 5,
      title: 'How to Clean Old Game Cartridges',
      description: 'A tutorial on cleaning and maintaining old game cartridges.',
      category: 'Restoration Tutorial',
      content: 'Detailed instructions on how to clean and preserve old cartridges...',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);

  // Filter resources based on search term
  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle resource selection to view content
  const viewResource = (resource) => {
    setSelectedResource(resource);
  };

  return (
    <div className="p-6 bg-white-to-br from-black-50 to-white-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center dark:text-white mb-6 ">Guidhub - Retro Gaming Resources</h1>

      {/* Search Bar */}
      <div className="mb-6 max-w-2xl mx-auto">
        <input
          type="text"
          className="w-full p-4 border border-blue-400 rounded shadow focus:ring-2 focus:ring-blue-300"
          placeholder="Search for guides, tips, or articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Resource Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white p-6 shadow-md rounded border hover:shadow-lg transform hover:-translate-y-1 transition duration-300 cursor-pointer hover:border-blue-400"
              onClick={() => viewResource(resource)}
            >
              <h2 className="text-2xl font-semibold text-blue-500 hover:text-blue-600 transition">
                {resource.title}
              </h2>
              <p className="text-gray-700 mt-2">{resource.description}</p>
              <p className="text-sm mt-4 text-gray-500">Category: {resource.category}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 text-lg">No resources found matching your search.</p>
        )}
      </div>

      {/* Resource Details */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">{selectedResource.title}</h2>
            <p className="text-gray-800 mb-4">{selectedResource.content}</p>
            <button
              onClick={() => setSelectedResource(null)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Guidhub;

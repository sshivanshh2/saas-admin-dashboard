'use client'

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, userName }){
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                
                <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Delete User</h2>
                <p className="text-gray-700 text-center mb-6">
                    Are you sure you want to delete <span className="font-semibold">{userName}</span>? 
                    This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-50 hover:cursor-pointer transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:cursor-pointer transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
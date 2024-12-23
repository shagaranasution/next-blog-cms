'use client';

type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  cancelText?: string;
  confirmText?: string;
  children?: React.ReactNode;
};

export function Modal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  cancelText = 'Yes',
  confirmText = 'Cancel',
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative transform -translate-y-16">
        <h1 className="text-xl font-bold mb-4">{title}</h1>
        <p className="mb-4">{message}</p>
        {children && <div className="mb-4">{children}</div>}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

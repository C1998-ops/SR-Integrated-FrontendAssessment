import React from "react";

interface ConfirmDialogProps {
	open: boolean;
	title?: string;
	message?: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
	open,
	title = "Confirm",
	message = "Are you sure?",
	onConfirm,
	onCancel,
}) => {
	if (!open) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
			<div className="bg-white rounded-md shadow-lg p-4 w-full max-w-sm">
				<h2 className="text-lg font-semibold mb-2">{title}</h2>
				<p className="text-sm mb-4">{message}</p>
				<div className="flex justify-end gap-2">
					<button
						type="button"
						className="px-3 py-1 text-sm rounded border"
						onClick={onCancel}
					>
						Cancel
					</button>
					<button
						type="button"
						className="px-3 py-1 text-sm rounded bg-red-600 text-white"
						onClick={onConfirm}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDialog;


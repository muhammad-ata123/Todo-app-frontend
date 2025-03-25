import React from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';

interface TodoFormProps {
  onSubmit: (title: string, description: string) => void;
  onCancel: () => void; // Ensure onCancel is included
  initialTitle?: string;
  initialDescription?: string;
  isEditing?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  onCancel, // Destructure onCancel
  initialTitle = '',
  initialDescription = '',
  isEditing = false,
}) => {
  const [title, setTitle] = React.useState(initialTitle);
  const [description, setDescription] = React.useState(initialDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Edit Todo' : 'Add New Todo'}
      </h2>
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
        required
      />
      <Input
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter todo description (optional)"
      />
      <div className="flex gap-2 mt-4">
        <Button type="submit"  className="flex-1">
          {isEditing ? 'Update Todo' : 'Add Todo'}
        </Button>
        <Button type="button"  className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;

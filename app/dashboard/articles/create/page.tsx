'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup
    .string()
    .required('Content is required')
    .min(100, 'Content must be at least 100 characters long'),
  images: yup
    .mixed()
    .test(
      'fileType',
      'Unsupported file format. Only PNG and JPEG are allowed.',
      (value: any) => {
        if (!value) return true; // Allow if no files are selected (optional field)
        return Array.from(value).every((file: any) =>
          ['image/png', 'image/jpeg'].includes(file?.type)
        );
      }
    )
    .test('fileSize', 'File size must be less than 5MB', (value: any) => {
      if (!value) return true; // Allow if no files are selected
      return Array.from(value).every(
        (file: any) => file.size <= 5 * 1024 * 1024 // 5 MB
      );
    })
    .nullable()
    .notRequired(),
});

export default function CreateArticlePage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          images: data.images
            ? Array.from(data.images as File[]).map((image: File) => image.name)
            : [],
        }),
      });

      if (res.ok) {
        router.push('/dashboard/articles');
      } else {
        console.error('Failed to create article.');
        setError('Failed to create article.');
      }
    } catch (error) {
      console.error(error);
      setError(error as any);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setValue('images', files, { shouldValidate: true });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Create New Article</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className="w-full border rounded p-2"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="content" className="block font-medium">
            Content
          </label>
          <textarea
            id="content"
            rows={6}
            {...register('content')}
            className="w-full border rounded p-2"
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="images" className="block font-medium">
            Images (Optional)
          </label>
          <input
            id="images"
            type="file"
            multiple
            {...register('images')}
            onChange={handleFileChange}
            className="w-full"
          />
          {errors.images && (
            <p className="text-red-500">
              {errors.images.message ||
                (Array.isArray(errors.images) &&
                  errors.images.map((fileError, idx) => (
                    <span key={idx}>{fileError.message}</span>
                  )))}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}>
          {loading ? 'Submitting...' : 'Create Article'}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

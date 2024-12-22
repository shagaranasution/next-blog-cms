'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FetchArticleResult } from '@/lib/data';
import { useRouter } from 'next/navigation';

const editArticleSchema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup
    .string()
    .required('Content is required')
    .min(100, 'Content mus be at least 100 characters long'),
  images: yup
    .mixed()
    .test(
      'fileType',
      'Unsupported file format. Only PNG and JPEG are allowed.',
      (value: any) => {
        if (!value) return true;

        return Array.from(value).every((file: any) => [
          'image/png',
          'image/jpeg'.includes(file?.type),
        ]);
      }
    )
    .test('fileSize', 'File size must be less than 5MB', (value: any) => {
      if (!value) return true;
      return Array.from(value).every(
        (file: any) => file.size <= 5 * 1024 * 1024
      );
    })
    .nullable()
    .notRequired(),
});

export function EditArticleForm({ article }: { article: FetchArticleResult }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editArticleSchema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    reset({
      title: article.title,
      content: article.content,
      images: article.images || null,
    });
  }, [article, reset]);

  const onSubmit = async (
    articleId: string,
    data: yup.InferType<typeof editArticleSchema>
  ) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard/articles/${articleId}`, {
        method: 'PUT',
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
        throw new Error(res.statusText);
      }
    } catch (error: any) {
      setError(`Failed to create article. ${error.message}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setValue('images', files, { shouldValidate: true });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit.bind(null, article.id))}
        className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            // value={getValues('title')}
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
            // value={getValues('content')}
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
            // value={(getValues('images') as yup.Maybe<[]>)?.map(
            //   (image: any) => image.url
            // )}
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
          {loading ? 'Updating...' : 'Update Article'}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

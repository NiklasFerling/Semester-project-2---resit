import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import createPost from "../../api/posts/create";

function NewPost() {
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    body: yup.string().required(),
    tags: yup.string().required(),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  function onSubmit(data) {
    const payload = {
      title: data.title,
      body: data.body,
      tags: data.tags.split(" "),
    };
    createPost(payload).then((response) => {
      if (response.data) {
        window.location.href = "/";
      }
    });
  }
  return (
    <div className="min-h-screen text-white w-80 m-auto">
      <Link to="/">
        <h1 className="text-center text-4xl mb-10">Devpedia</h1>
      </Link>
      <h2 className="text-xl mb-4">New post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label className="mb-1" htmlFor="title">
          Title
        </label>
        <input
          {...register("title")}
          className="px-2 py-1 mb-3 rounded-md text-white bg-neutral-600 focus:outline-none"
        />
        {/* <p className="text-red-400 mb-2">{errors.title?.message}</p> */}

        <label className="mb-1" htmlFor="title">
          Body
        </label>
        <textarea
          {...register("body")}
          className="px-2 py-1 mb-3 rounded-md text-white bg-neutral-600 focus:outline-none"
          rows={10}
        ></textarea>
        <label className="mb-1" htmlFor="tags">
          Tags (seperated by space)
        </label>
        <input
          {...register("tags")}
          className="px-2 py-1 mb-2 rounded-md text-white bg-neutral-600 focus:outline-none"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default NewPost;

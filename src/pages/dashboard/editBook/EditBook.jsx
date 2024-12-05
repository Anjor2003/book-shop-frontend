import React, { useEffect } from "react";
import axios from "axios";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useFetchBookByIdQuery,
  useUpdateBookMutation,
} from "../../../redux/features/books/booksApi";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import getBaseUrl from "../../../utils/baseURL.js";

const EditBook = () => {
  const { id } = useParams();
  const { data: bookData, refetch } = useFetchBookByIdQuery(id);
  const [updateBook, { isLoading, isError }] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    if (bookData) {
      setValue("title", bookData.title);
      setValue("description", bookData.description);
      setValue("category", bookData?.category);
      setValue("trending", bookData.trending);
      setValue("oldPrice", bookData.oldPrice);
      setValue("newPrice", bookData.newPrice);
      setValue("coverImage", bookData.coverImage);
      console.log(bookData);
    }
  }, [bookData, setValue]);

  const onSubmit = async (data) => {
    const updatedBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
    };

    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updatedBookData, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "LIbro actualizado con exito",
        showConfirmButton: false,
        timer: 1600,
      });
      await refetch();
    } catch (error) {
      console.log("Error al actualizar el libro", error);
      alert("Error al actualizar el libro. Intente nuevamente.");
    }
  };

  if (isLoading) return <Loading />;

  if (isError) return <div>Error cargando el libro</div>;

  return (
    <div className="max-w-lg mx-auto p-3 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Actualizar Libro
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Titulo"
          name="title"
          placeholder="Introdce el titulo del libro"
          register={register}
        />
        <InputField
          label="Descripcion"
          name="description"
          placeholder="Introdce la descripcion del libro"
          type="textarea"
          register={register}
        />
        <SelectField
          label="Categoria"
          name="category"
          options={[
            { value: "", label: "Seleccione una categoria" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technologia" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
            // Añade mas opciones de categorias aqui
          ]}
          register={register}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        <InputField
          label="Precio Anterior"
          name="oldPrice"
          type="number"
          placeholder="Precio Anterior"
          register={register}
        />
        <InputField
          label="Precio Nuevo"
          name="newPrice"
          type="number"
          placeholder="Precio Nuevo"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md">
          Actualizar Libro
        </button>
      </form>
    </div>
  );
};

export default EditBook;

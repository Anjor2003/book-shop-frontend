import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../../../redux/features/books/booksApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const [imageFileName, setImageFileName] = useState("");

  const onSubmit = async (data) => {
    const newBook = {
      ...data,
      coverImage: imageFileName,
    };
    try {
      await addBook(newBook).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "LIbro añadido con exito",
        showConfirmButton: false,
        timer: 1600,
      });

      reset();
      setImageFileName("");
      setImageFile(null);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error al añadir el libro. Intente nuevamente.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Añade nuevo libro
      </h2>

      {/* formulario empieza aqui */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* input reutilizable para Titulo */}
        <InputField
          label="Titulo"
          name="title"
          placeholder="Introdce el titulo del libro"
          register={register}
        />
        {/* textArea reutiliable para descripcion */}
        <InputField
          label="Descripcion"
          name="description"
          placeholder="Introdce la descripcion del libro"
          type="textarea"
          register={register}
        />
        {/* Select reutilizable para categoria */}
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

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700 font-semibold">
              Trending
            </span>
          </label>
        </div>

        {/* input reutilizable para precio */}
        <InputField
          label="Precio Anterior"
          name="oldPrice"
          type="number"
          placeholder="Precio Anterior"
          register={register}
        />
        {/* input reutilizable para precio */}
        <InputField
          label="Precio Nuevo"
          name="newPrice"
          type="number"
          placeholder="Precio Nuevo"
          register={register}
        />

        {/* Cover Imagen Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white  font-semibold rounded-md">
          {isLoading ? <span>Añadiendo...</span> : <span>Añadir</span>}
        </button>
      </form>
    </div>
  );
};

export default AddBook;

import React from "react";
import { getImgtUrl } from "../../utils/getImgtUrl";
import { useParams } from "react-router-dom";
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookDetail = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error cargando el libro</div>;
  }

  return (
    <div className="max-w-4xl mx-auto shadow-xl p-5">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        {book.title}
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 text-xl sm:text-lg">
        <div className="sm:w-1/2">
          <img
            src={`${getImgtUrl(book?.coverImage)}`}
            alt={book.title}
            className="w-full mb-8"
          />
        </div>
        <div className="mb-5 sm:w-full">
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong>
            <span className="ml-2">{book.author || "admin"}</span>
          </p>
          <p className="text-gray-700 mb-2 w-full">
            <strong>Published:</strong>
            <span className="ml-2">
              {new Date(book?.createdAt).toLocaleDateString()}
            </span>
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> 
            <span className="ml-2">{book.description}</span>
          </p>
          <div className="mt-5 flex items-center gap-4 text-xl">
            <p className=" text-gray-700 font-bold">
              Price:{" "}
              <span className="text-blue-600 ml-2">{book.newPrice} €</span>
            </p>
            {book.oldPrice && (
              <p className="text-red-700 line-through">{book.oldPrice} €</p>
            )}
          </div>
          <button
            onClick={() => handleAddToCart(book)}
            className="btn-primary px-6 space-x-1 flex items-center gap-1 mt-5">
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

import css from "./App.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import NoteList from "../NoteList/NoteList";
import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import { PER_PAGE } from "../../constants";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ["notes", search, page, PER_PAGE],
    queryFn: () => fetchNotes(search, page, PER_PAGE),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (!data || search === "" || isFetching || isError) {
      return;
    }

    if (data.notes.length === 0) {
      toast.error("No notes found for your request.");
    }
  }, [data, search, isFetching, isError]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <div className={css["app"]}>
      <header className={css["toolbar"]}>
        <SearchBox onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            handlePage={setPage}
          />
        )}

        <button className={css["button"]} type="button" onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
      <ToastContainer position="top-center" autoClose={1500} theme="colored" />
    </div>
  );
}

import css from './NoteList.module.css';
import type { Note } from '../../types/note';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import { toast } from 'react-toastify';

interface NoteListProps {
  notes: Note[];
}


export default function NoteList ({notes}: NoteListProps) {
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: deleteNote, 
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['notes']});
      toast.success("The note was successfully deleted")
    }, 
    onError() {
      toast.error("Operation failed, please, try again later")
    }
  });

  const handleDelete = (id: Note["id"]) => {
    mutate(id);
  }
  
    return (
        <ul className={css['list']}>
	{notes.map(({id, title, content, tag}) => (
    <li className={css['listItem']} key={id}>
    <h2 className={css['title']}>{title}</h2>
    <p className={css['content']}>{content}</p>
    <div className={css['footer']}>
      <span className={css['tag']}>{tag}</span>
      <button className={css['button']} onClick={() => handleDelete(id)} disabled ={isPending}>Delete</button>
    </div>
  </li>
  ))}
</ul>
    );
};
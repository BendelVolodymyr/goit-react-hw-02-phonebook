import { Contact } from 'components/App';

interface ContactListProps {
  createList: Contact[];
  onDelete: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ createList, onDelete }) => {
  const newList = createList.map(({ id, name, number }) => {
    return (
      <li className="contact__box-li" key={id}>
        <span>{name}:</span>
        <span>{number}</span>
        <button
          className="contact__box-button"
          type="button"
          onClick={() => onDelete(id!)}
        >
          delete
        </button>
      </li>
    );
  });
  return <ul className="contact__box">{newList}</ul>;
};

export default ContactList;

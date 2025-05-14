interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="section">
      <div>
        {title !== undefined && <h2>{title}</h2>}
        {children !== undefined && children}
      </div>
    </section>
  );
};

export default Section;

const tools = ['地球', '图层', '关系', '星光', '360'];

export default function FloatingToolBar() {
  return (
    <div className="floating-toolbar" aria-label="Globe tools">
      {tools.map((tool) => (
        <button key={tool} type="button">
          {tool}
        </button>
      ))}
    </div>
  );
}

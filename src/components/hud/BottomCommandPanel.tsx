export default function BottomCommandPanel() {
  return (
    <form className="bottom-command" aria-label="AI strategy command">
      <div>
        <span className="eyebrow">AI 战略指令</span>
        <input placeholder="请输入你的战略指令，例如：与美国建立更紧密的军事联盟" />
      </div>
      <button type="button">发送指令</button>
    </form>
  );
}

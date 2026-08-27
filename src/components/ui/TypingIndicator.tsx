export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1" aria-label="AI is typing" role="status">
      <span className="typing-dot animate-bounce-dot" style={{ animationDelay: '0ms' }} />
      <span className="typing-dot animate-bounce-dot" style={{ animationDelay: '160ms' }} />
      <span className="typing-dot animate-bounce-dot" style={{ animationDelay: '320ms' }} />
    </div>
  );
}

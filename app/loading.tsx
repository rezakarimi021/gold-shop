const Loading = () => (
  <div
    className="flex min-h-screen items-center justify-center"
    role="status"
    aria-label="در حال بارگذاری"
  >
    <div className="flex flex-col items-center gap-6">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold-muted border-t-gold" />
      <p className="text-sm tracking-wider text-muted-foreground">لطفاً صبر کنید</p>
    </div>
  </div>
);

export default Loading;

import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Download, HelpCircle, MessageCircleMore, Paperclip, Send } from "lucide-react";
import { ZALO_LINK } from "@/lib/payment";

export const Route = createFileRoute("/huong-dan-skill")({
  head: () => ({
    meta: [{ title: "Hướng dẫn cài Skill · KOL AI Skill World" }],
  }),
  component: HuongDanSkillPage,
});

function StepCard({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-primary-foreground shadow-brand">
        {number}
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <h3 className="font-semibold leading-snug tracking-normal">{title}</h3>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}

function OsBlock({ os, children }: { os: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/60 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">{os}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

function SectionTitle({ icon: Icon, children }: { icon: typeof Bot; children: React.ReactNode }) {
  return (
    <h2 className="mt-14 flex items-center gap-2 text-2xl sm:text-3xl">
      <Icon className="h-6 w-6 text-primary" />
      {children}
    </h2>
  );
}

function HuongDanSkillPage() {
  return (
    <main className="min-h-screen bg-soft-gradient">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-brand-gradient shadow-brand" />
            <span className="truncate font-display text-2xl">
              KOL AI <span className="text-gradient">Skill World</span>
            </span>
          </Link>
          <Link
            to="/tai-skill"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent"
          >
            ← Tải Skill
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl">Hướng dẫn cài & dùng Skill</h1>
        <p className="mt-2 text-muted-foreground">
          Chỉ 3 bước, dùng được trên cả ChatGPT lẫn Claude — không cần cài đặt hay giải nén gì cả.
        </p>

        <SectionTitle icon={Bot}>3 bước dùng Skill</SectionTitle>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Cách làm giống nhau trên cả{" "}
          <span className="font-medium text-foreground">chatgpt.com</span> và{" "}
          <span className="font-medium text-foreground">claude.ai</span>.
        </p>
        <div className="mt-4 space-y-3">
          <StepCard number={1} title="Tải file .zip lên khung chat">
            <p className="flex items-start gap-1.5">
              <Paperclip className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Mở đoạn chat mới trên ChatGPT hoặc Claude → bấm biểu tượng đính kèm (dấu +/kẹp giấy)
              cạnh ô nhập tin nhắn → chọn thẳng file{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">.zip</code> vừa tải về (không
              cần giải nén).
            </p>
          </StepCard>
          <StepCard number={2} title={'Gõ: "Đọc Skill"'}>
            <p>
              Gửi kèm câu này ngay sau khi đính kèm file → bấm Gửi. AI sẽ đọc và hiện ra công dụng
              cùng hướng dẫn sử dụng của skill này.
            </p>
          </StepCard>
          <StepCard number={3} title="Làm theo hướng dẫn">
            <p className="flex items-start gap-1.5">
              <Download className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Làm đúng theo những gì AI vừa hướng dẫn ở bước 2 (có skill cần gửi thêm ảnh, có skill
              chỉ cần vậy là ra kết quả ngay) — xem thêm mẫu câu ở trang sản phẩm bạn đã mua nếu
              cần. Khi có kết quả, bấm vào để tải/lưu về máy.
            </p>
          </StepCard>
        </div>
        <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Lưu ý:</strong> bản miễn phí của ChatGPT lẫn Claude
          đều dùng được hầu hết skill. Riêng skill nào ghi rõ cần{" "}
          <strong className="text-foreground">"Code Interpreter"</strong> trong mô tả sản phẩm thì
          cần gói <strong className="text-foreground">ChatGPT Plus</strong>.
          <br />
          <span className="mt-1.5 block">
            Mẹo: muốn khỏi phải đính kèm lại file mỗi lần mở đoạn chat mới — trên Claude có thể cài
            Skill cố định qua Settings → Skills, trên ChatGPT có thể tạo 1 Custom GPT riêng và nạp
            file 1 lần. Cả 2 đều không bắt buộc, chỉ để tiện hơn về sau.
          </span>
        </div>

        {/* FAQ */}
        <SectionTitle icon={HelpCircle}>Câu hỏi thường gặp</SectionTitle>
        <div className="mt-4 space-y-3">
          <StepCard number={1} title="ChatGPT/Claude nói không mở được file .zip?">
            <p>
              Rất hiếm khi xảy ra, nhưng nếu gặp thì giải nén file ra rồi gửi lại file{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">SKILL.md</code> bên trong:
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <OsBlock os="Windows">
                Chuột phải vào file .zip → chọn <strong>"Extract All..."</strong> (Giải nén tất cả)
                → bấm Extract.
              </OsBlock>
              <OsBlock os="Mac">
                Chỉ cần nhấp đúp (double-click) vào file, máy tự động giải nén ra 1 thư mục cùng
                tên.
              </OsBlock>
            </div>
            <p>
              Sau đó gửi file{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">SKILL.md</code> thay cho file
              .zip. Nếu vẫn không được, mở file đó bằng Notepad, copy toàn bộ nội dung chữ, dán
              thẳng vào khung chat — cách này luôn hoạt động.
            </p>
          </StepCard>
          <StepCard number={2} title="Skill chạy nhưng kết quả không như mong đợi?">
            <p>
              Thử gõ yêu cầu rõ ràng hơn, hoặc dùng ảnh khác chất lượng tốt hơn (rõ nét, đủ sáng).
              Mỗi lần chạy AI có thể ra kết quả hơi khác nhau, thử lại 1-2 lần thường sẽ ổn.
            </p>
          </StepCard>
          <StepCard number={3} title="Vẫn không làm được, phải làm sao?">
            <p>Nhắn trực tiếp qua Zalo, gửi kèm ảnh chụp màn hình chỗ bạn đang bị vướng.</p>
          </StepCard>
        </div>

        <a
          href={ZALO_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02]"
        >
          <Send className="h-4 w-4" />
          Cần hỗ trợ thêm? Nhắn Zalo ngay
        </a>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <MessageCircleMore className="h-3.5 w-3.5 shrink-0" />
          Chúng tôi phản hồi trực tiếp, không qua hệ thống tự động.
        </p>

        <div className="mt-10 text-center">
          <Link
            to="/tai-skill"
            className="inline-block rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            ← Về trang Tải Skill
          </Link>
        </div>
      </div>
    </main>
  );
}

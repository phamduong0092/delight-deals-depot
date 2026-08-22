import type { LucideIcon } from "lucide-react";
import {
  Award,
  Bot,
  BookOpen,
  Building2,
  Camera,
  Clapperboard,
  Compass,
  CreditCard,
  Dumbbell,
  Film,
  Gift,
  Globe,
  Layers,
  LayoutTemplate,
  Mic,
  Mic2,
  MessageCircle,
  Monitor,
  Music,
  Newspaper,
  Package,
  PartyPopper,
  PenTool,
  Presentation,
  Rocket,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Type,
  Users,
  Wand2,
  Zap,
} from "lucide-react";
import kolGym from "@/assets/kol-gym.asset.json";
import sanh1Graduation from "@/assets/sanh-1/graduation.webp";
import sanh1Launch from "@/assets/sanh-1/launch.webp";
import sanh1Honor from "@/assets/sanh-1/honor.webp";
import sanh1Workshop from "@/assets/sanh-1/workshop.webp";
import sanh1StoryBrand from "@/assets/sanh-1/story-brand.webp";
import sanh1PrMedia from "@/assets/sanh-1/pr-media.webp";

export type Product = {
  id: string;
  categoryId: string;
  title: string;
  tag: string;
  price: number;
  icon: LucideIcon;
  image?: string;
  video?: string;
  bestseller?: boolean;
  /** true khi Skill Pack đã có nội dung thật đứng sau (file thật, mua được ngay). Mặc định false = "Sắp ra mắt". */
  available?: boolean;
  /** true = không bán qua giỏ hàng, giá "Liên hệ" — hiện nút liên hệ Zalo thay vì Mua ngay/Thêm giỏ. */
  contactOnly?: boolean;
  shortDesc: string;
  longDesc: string;
  features: string[];
};

export type Category = {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
};

type CategorySeed = {
  id: string;
  title: string;
  subtitle: string;
  products: Omit<Product, "categoryId">[];
};

const seed: CategorySeed[] = [
  {
    id: "ready",
    title: "SKILL 1 · Sẵn Sàng Dùng Ngay — Kích Hoạt Trong 1 Phút",
    subtitle: "Đã kích hoạt thật — mua xong dùng được liền, không cần chờ đợi",
    products: [
      {
        id: "S0001",
        title: "Skill · TVC Thương Hiệu",
        tag: "Cinematic",
        price: 2,
        icon: Film,
        available: true,
        bestseller: true,
        shortDesc:
          "AI Skill thật: từ 1 ảnh tạo Storyboard điện ảnh nhiều góc quay + 1 prompt video hoàn chỉnh.",
        longDesc:
          "Đây là Skill Pack đầy đủ — không phải hướng dẫn suông, mà là một AI Skill thật, cài thẳng vào Claude hoặc ChatGPT để dùng ngay. Từ một ảnh tham chiếu, Skill tự dựng kịch bản điện ảnh nhiều nhịp hành động, tạo storyboard nhiều góc quay khóa chặt nhận diện khuôn mặt và trang phục, rồi viết sẵn một prompt video tổng hợp tối ưu cho Omni hoặc Seedance. Chế độ Multishot còn tạo 9 ảnh góc quay khác nhau từ cùng một khoảnh khắc để làm nội dung đăng bài.",
        features: [
          "AI Skill thật — cài vào Claude/ChatGPT dùng ngay, không chỉ là hướng dẫn",
          "Chế độ Storyboard: kịch bản điện ảnh nhiều góc quay + 1 prompt video Omni/Seedance",
          "Chế độ Multishot: 9 ảnh góc quay khác nhau từ cùng 1 khoảnh khắc",
          "Face Lock & Outfit Lock — giữ đúng nhân vật, trang phục xuyên suốt mọi ảnh",
        ],
      },
      {
        id: "S0002",
        title: "Skill · Hoán Đổi Nhân Vật Thương Hiệu",
        tag: "Face Swap",
        price: 2,
        icon: Wand2,
        available: true,
        bestseller: true,
        shortDesc:
          "AI Skill thật: biến bất kỳ ảnh tham chiếu nào thành ảnh có nhân vật thương hiệu cố định, giữ nguyên bối cảnh.",
        longDesc:
          "Skill Pack thật — cài vào Claude hoặc ChatGPT (có công cụ tạo ảnh) để dùng ngay. Gửi 1 hoặc nhiều ảnh tham chiếu bất kỳ (dáng, bối cảnh, ánh sáng tự chọn), Skill khóa gương mặt và trang phục của nhân vật thương hiệu cố định vào đúng khung cảnh đó — tạo hàng loạt ảnh nhất quán mà không cần chụp lại.",
        features: [
          "AI Skill thật — dùng ngay trên Claude hoặc ChatGPT, không chỉ là hướng dẫn",
          "Gửi ảnh tham chiếu bất kỳ, giữ nguyên bối cảnh — chỉ đổi nhân vật",
          "Khóa gương mặt & trang phục thương hiệu xuyên suốt mọi ảnh",
          "Tạo hàng loạt ảnh nhất quán từ nhiều ảnh tham chiếu cùng lúc",
        ],
      },
      {
        id: "S0003",
        title: "Skill · Bộ Poster Sản Phẩm AI",
        tag: "Product",
        price: 2,
        icon: Package,
        available: true,
        shortDesc:
          "AI Skill thật: từ 1 ảnh sản phẩm tạo ngay 10 poster quảng cáo chuyên nghiệp, đa phong cách.",
        longDesc:
          "Skill Pack thật — cài vào Claude hoặc ChatGPT (có công cụ tạo ảnh) để dùng ngay. Gửi 1 ảnh sản phẩm, Skill phân tích như một art director quảng cáo thật rồi tạo ra 10 poster khác nhau về bối cảnh, ánh sáng, bố cục — luôn giữ đúng hình dạng, màu sắc, logo, chữ trên bao bì gốc, không tự bịa thêm giá hay khuyến mãi.",
        features: [
          "AI Skill thật — dùng ngay trên Claude hoặc ChatGPT, không chỉ là hướng dẫn",
          "10 poster khác nhau từ 1 ảnh sản phẩm duy nhất",
          "Giữ nguyên logo, chữ, bao bì gốc — không bịa thêm nội dung",
          "Phân tích như art director quảng cáo chuyên nghiệp trước khi tạo",
        ],
      },
      {
        id: "S0004",
        title: "Skill · Ảnh KOL Uyên Linh",
        tag: "KOL",
        price: 2,
        icon: Sparkles,
        available: true,
        shortDesc:
          "AI Skill thật: tạo poster, banner, ảnh bán hàng mượn hình ảnh KOL Uyên Linh có sẵn.",
        longDesc:
          "Skill Pack thật — cài vào Claude hoặc ChatGPT để dùng ngay. Nhập chủ đề (sản phẩm, dịch vụ, khóa học...), Skill tự tạo poster, banner, thumbnail theo đúng bộ nhận diện hình ảnh của KOL Uyên Linh — nhân vật, ánh sáng, bố cục, tiêu đề đồng nhất, sẵn sàng dùng cho trang bán hàng hoặc bài đăng mạng xã hội. Phù hợp khi bạn muốn mượn hình ảnh 1 KOL có sẵn thay vì tự chụp.",
        features: [
          "AI Skill thật — dùng ngay trên Claude hoặc ChatGPT, không chỉ là hướng dẫn",
          "Mượn hình ảnh & nhận diện KOL Uyên Linh có sẵn, không cần tự chụp",
          "Tạo poster, banner, thumbnail đồng bộ 1 bộ nhận diện",
          "Định hướng luôn nội dung + hình ảnh cho trang bán hàng",
        ],
      },
      {
        id: "S0005",
        title: "Skill · Overlay Chữ Ảnh Đăng Bài",
        tag: "Social",
        price: 2,
        icon: Type,
        available: true,
        shortDesc:
          "AI Skill thật: tự chèn tiêu đề + badge thương hiệu lên ảnh, chuẩn khung đăng Facebook/Instagram.",
        longDesc:
          "Skill Pack thật — chạy bằng code Python có sẵn trong gói (Skill tự viết headline, tự chèn chữ và badge lên ảnh). Cần môi trường chạy được code: Claude Code, hoặc ChatGPT có bật Code Interpreter (mục 'Advanced Data Analysis' — có sẵn trên gói ChatGPT Plus). Gửi 1 ảnh, Skill tự trích tiêu đề ngắn gọn, chèn chữ trắng đậm kèm 1 từ khóa tô neon vàng-chanh và badge thương hiệu ở góc dưới phải, xuất đúng khung 1080x1350 chuẩn feed.",
        features: [
          "AI Skill thật — chạy bằng code có sẵn trong gói, không chỉ là hướng dẫn",
          "Cần Claude Code hoặc ChatGPT có bật Code Interpreter để chạy",
          "Tự trích tiêu đề, không cần tự viết chữ",
          "Xuất đúng khung 1080x1350 chuẩn Facebook/Instagram feed",
        ],
      },
      {
        id: "S0006",
        title: "Skill · Sáng Tác Nhạc AI",
        tag: "Music",
        price: 2,
        icon: Music,
        shortDesc: "Kỹ năng tạo nhạc bằng AI ngay trên web, nghe thử kết quả trước khi tải.",
        longDesc:
          "Đang phát triển — nhập lời hoặc mood mong muốn, AI tự sáng tác một bản nhạc hoàn chỉnh, nghe và tải trực tiếp ngay trên web, không cần tự vào ứng dụng nhạc AI riêng.",
        features: [
          "Nhập lời hoặc mood, AI tự sáng tác nhạc",
          "Nghe thử kết quả ngay trên web trước khi tải",
          "Không cần tự vào ứng dụng nhạc AI riêng",
          "Sắp ra mắt",
        ],
      },
    ],
  },
  {
    id: "poster",
    title: "SKILL 2 · Nâng Tầm Thương Hiệu Cá Nhân — Như Có Ê-Kíp Riêng",
    subtitle: "Bộ kỹ năng xây dựng hình ảnh KOL đẳng cấp — từ định vị đến sân khấu",
    products: [
      {
        id: "S0101",
        title: "Skill · Sân Khấu Vinh Danh",
        tag: "Signature",
        price: 2,
        icon: Award,
        image: sanh1Graduation,
        bestseller: true,
        shortDesc:
          "Kỹ năng xuất hiện trên sân khấu vinh danh — dựng khoảnh khắc đỉnh cao sự nghiệp.",
        longDesc:
          "Skill Pack hướng dẫn bạn dựng bộ hình ảnh sân khấu vinh danh chuẩn KOL: từ cách chọn góc máy, ánh sáng, đến bố cục caption tôn vinh thành tích. Dùng để xây uy tín cá nhân trước khi tung ra sản phẩm hoặc khóa học mới.",
        features: [
          "Bộ 12 prompt dựng ảnh sân khấu vinh danh",
          "Hướng dẫn chọn outfit và ánh sáng chuẩn sự kiện",
          "Mẫu caption tôn vinh thành tích chuyển đổi cao",
          "File preset màu tương thích mọi nền tảng",
        ],
      },
      {
        id: "S0102",
        title: "Skill · Ra Mắt Thương Hiệu",
        tag: "Premium",
        price: 2,
        icon: PartyPopper,
        image: sanh1Launch,
        shortDesc: "Kỹ năng dựng chiến dịch ra mắt thương hiệu tạo hiệu ứng lan tỏa.",
        longDesc:
          "Từ teaser đến ngày ra mắt chính thức — Skill Pack này cung cấp lộ trình 7 ngày dựng nội dung ra mắt thương hiệu, kèm khung kịch bản đếm ngược tạo cảm giác khan hiếm và hào hứng cho người theo dõi.",
        features: [
          "Lộ trình nội dung ra mắt 7 ngày",
          "Khung kịch bản đếm ngược tạo độ hot",
          "Bộ mẫu caption + hashtag ra mắt",
          "Checklist truyền thông đa kênh",
        ],
      },
      {
        id: "S0103",
        title: "Skill · Định Vị Chuyên Gia",
        tag: "Advanced",
        price: 2,
        icon: Trophy,
        image: sanh1Honor,
        shortDesc: "Kỹ năng định vị bản thân là chuyên gia đầu ngành trong 30 ngày.",
        longDesc:
          "Skill Pack tổng hợp công thức định vị chuyên gia: chọn ngách, xây dựng luận điểm riêng, và hệ thống nội dung chứng minh năng lực. Phù hợp cho ai muốn được nhận diện là người dẫn đầu trong lĩnh vực của mình.",
        features: [
          "Công thức chọn ngách chuyên môn",
          "Bộ 20 luận điểm định vị mẫu",
          "Lịch nội dung chứng minh năng lực 30 ngày",
          "Hướng dẫn xây dựng signature story",
        ],
      },
      {
        id: "S0104",
        title: "Skill · Diễn Thuyết Workshop",
        tag: "Master",
        price: 2,
        icon: Mic,
        image: sanh1Workshop,
        shortDesc: "Kỹ năng đứng lớp và diễn thuyết workshop tự tin, cuốn hút.",
        longDesc:
          "Bộ kỹ năng giúp bạn tự tin đứng trước đám đông: cấu trúc bài giảng, cách mở đầu gây chú ý, kỹ thuật giữ nhịp năng lượng khán phòng và chốt lời kêu gọi hành động mạnh mẽ ở cuối buổi.",
        features: [
          "Khung cấu trúc bài giảng 60 phút",
          "10 cách mở đầu gây chú ý tức thì",
          "Kỹ thuật giữ nhịp năng lượng khán phòng",
          "Mẫu CTA chốt học viên cuối buổi",
        ],
      },
      {
        id: "S0105",
        title: "Skill · Kể Chuyện Thương Hiệu",
        tag: "Story",
        price: 2,
        icon: BookOpen,
        image: sanh1StoryBrand,
        shortDesc: "Kỹ năng kể chuyện thương hiệu chạm cảm xúc, tăng độ tin cậy.",
        longDesc:
          "StoryBrand Skill Pack hướng dẫn bạn xây dựng câu chuyện thương hiệu theo mô hình hành trình khách hàng: vấn đề — giải pháp — chuyển hoá. Dùng để viết bio, video giới thiệu, hoặc landing page.",
        features: [
          "Khung câu chuyện thương hiệu 5 bước",
          "Mẫu bio cá nhân chạm cảm xúc",
          "Bộ câu hỏi khai thác chất liệu câu chuyện",
          "Ví dụ áp dụng cho 3 ngành hàng phổ biến",
        ],
      },
      {
        id: "S0106",
        title: "Skill · Xuất Hiện Truyền Thông",
        tag: "PR",
        price: 2,
        icon: Newspaper,
        image: sanh1PrMedia,
        shortDesc: "Kỹ năng xây dựng hình ảnh xuất hiện trên truyền thông, báo chí.",
        longDesc:
          "Skill Pack giúp bạn dựng bộ hình ảnh và thông cáo báo chí chuyên nghiệp để xuất hiện trên các kênh truyền thông, tăng độ tin cậy thương hiệu cá nhân trong mắt khách hàng và đối tác.",
        features: [
          "Mẫu thông cáo báo chí cá nhân",
          "Hướng dẫn dựng ảnh phong cách phỏng vấn",
          "Bộ câu hỏi & trả lời phỏng vấn mẫu",
          "Checklist chuẩn bị trước buổi ghi hình",
        ],
      },
    ],
  },
  {
    id: "lifestyle",
    title: "APP 1 · Công Cụ AI Mở Là Chạy — Không Cần Cài Đặt",
    subtitle: "Ứng dụng AI dùng trực tiếp trên trình duyệt, không cần biết code",
    products: [
      {
        id: "S0201",
        title: "Skill · Selfie Chuyển Động",
        tag: "Video Pack",
        price: 3,
        icon: Dumbbell,
        image: kolGym.url,
        shortDesc: "Kỹ năng quay video selfie chuyển động tự nhiên, năng lượng cao.",
        longDesc:
          "Video Pack hướng dẫn quay các đoạn selfie chuyển động tại phòng gym hoặc không gian năng động, giữ khung hình ổn định và truyền tải năng lượng tích cực — rất hiệu quả cho nội dung lifestyle bán hàng.",
        features: [
          "Video mẫu chuyển động chuẩn góc quay",
          "Hướng dẫn giữ khung hình khi di chuyển",
          "Bộ nhạc nền gợi ý theo nhịp năng lượng",
          "Checklist ánh sáng phòng tập",
        ],
      },
      {
        id: "S0202",
        title: "App · Trợ Lý Viết Content AI",
        tag: "Content",
        price: 3,
        icon: Bot,
        shortDesc: "App AI viết caption, kịch bản, mô tả sản phẩm theo đúng giọng văn thương hiệu.",
        longDesc:
          "Đang phát triển — một app AI riêng, mở link là dùng ngay trên trình duyệt, không cần cài đặt hay biết code. Nhập chủ đề, app tự viết caption, kịch bản ngắn, mô tả sản phẩm theo đúng giọng văn thương hiệu bạn đã chọn.",
        features: [
          "Mở link là dùng ngay, không cần cài đặt",
          "Tự viết theo đúng giọng văn thương hiệu đã chọn",
          "Xuất nhiều phiên bản để chọn bản ưng ý nhất",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0203",
        title: "App · Studio Ảnh Sản Phẩm AI",
        tag: "Studio",
        price: 3,
        icon: Camera,
        shortDesc: "App AI biến ảnh sản phẩm chụp bằng điện thoại thành ảnh studio chuyên nghiệp.",
        longDesc:
          "Đang phát triển — tải ảnh sản phẩm chụp bằng điện thoại lên app, AI tự dựng lại thành ảnh studio chuyên nghiệp với ánh sáng và bối cảnh chuẩn thương mại, không cần thiết bị chụp ảnh đắt tiền.",
        features: [
          "Chỉ cần ảnh chụp bằng điện thoại",
          "Tự dựng ánh sáng và bối cảnh studio",
          "Nhiều phong cách bối cảnh để chọn",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0204",
        title: "App · Chatbot Tư Vấn Bán Hàng",
        tag: "Chatbot",
        price: 3,
        icon: MessageCircle,
        shortDesc: "App AI trả lời khách hàng tự động, tư vấn sản phẩm theo kịch bản bán hàng.",
        longDesc:
          "Đang phát triển — app chatbot AI trả lời tin nhắn khách hàng tự động 24/7, tư vấn sản phẩm và xử lý câu hỏi thường gặp theo đúng kịch bản bán hàng bạn thiết lập.",
        features: [
          "Trả lời khách hàng tự động 24/7",
          "Tư vấn theo đúng kịch bản bán hàng đã thiết lập",
          "Không cần biết lập trình để cài đặt",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0205",
        title: "App · Thẻ Giới Thiệu Số & Mã QR",
        tag: "Digital Card",
        price: 3,
        icon: Smartphone,
        shortDesc: "App AI tạo thẻ giới thiệu số (digital business card) kèm mã QR chia sẻ nhanh.",
        longDesc:
          "Đang phát triển — tạo thẻ giới thiệu số cho cá nhân hoặc thương hiệu, gồm thông tin liên hệ và các kênh mạng xã hội, chia sẻ nhanh chỉ bằng một mã QR hoặc một đường link.",
        features: [
          "Tạo thẻ giới thiệu số trong vài phút",
          "Kèm mã QR chia sẻ nhanh",
          "Gộp mọi kênh liên hệ vào 1 link duy nhất",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0206",
        title: "App · Bộ Tạo Ảnh Tức Thì",
        tag: "Instant",
        price: 3,
        icon: Zap,
        shortDesc: "App AI tạo ảnh quảng cáo tức thì từ 1 dòng mô tả, không cần prompt phức tạp.",
        longDesc:
          "Đang phát triển — chỉ cần gõ 1 dòng mô tả ngắn, app tự tạo ngay ảnh quảng cáo hoàn chỉnh, không cần biết cách viết prompt phức tạp như khi dùng công cụ AI tạo ảnh thông thường.",
        features: [
          "Chỉ cần gõ 1 dòng mô tả ngắn",
          "Không cần biết viết prompt phức tạp",
          "Tạo ảnh trong vài giây",
          "Sắp ra mắt",
        ],
      },
    ],
  },
  {
    id: "video",
    title: "APP 2 · Ứng Dụng Tự Động Hoá — Tiết Kiệm Giờ Mỗi Ngày",
    subtitle: "App AI xử lý các công việc lặp lại, để bạn tập trung vào bán hàng",
    products: [
      {
        id: "S0301",
        title: "App · Cắt Dựng Video Tự Động",
        tag: "Video",
        price: 3,
        icon: Clapperboard,
        shortDesc: "App AI tự cắt dựng video ngắn từ video dài, sẵn phụ đề và nhạc nền.",
        longDesc:
          "Đang phát triển — tải video dài lên app, AI tự chọn đoạn hay nhất, cắt dựng thành video ngắn kèm phụ đề và nhạc nền, sẵn sàng đăng lên mạng xã hội.",
        features: [
          "Tự chọn đoạn hay nhất từ video dài",
          "Tự thêm phụ đề và nhạc nền",
          "Xuất đúng tỷ lệ khung hình cho từng nền tảng",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0302",
        title: "App · Lồng Tiếng AI Đa Ngôn Ngữ",
        tag: "Voice",
        price: 3,
        icon: Mic2,
        shortDesc: "App AI lồng tiếng tự nhiên cho video, hỗ trợ nhiều ngôn ngữ.",
        longDesc:
          "Đang phát triển — nhập kịch bản hoặc tải video lên, AI tự lồng tiếng tự nhiên theo giọng bạn chọn, hỗ trợ nhiều ngôn ngữ khác nhau mà không cần thuê diễn viên lồng tiếng.",
        features: [
          "Giọng đọc tự nhiên, nhiều lựa chọn giọng",
          "Hỗ trợ nhiều ngôn ngữ",
          "Không cần thuê diễn viên lồng tiếng",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0303",
        title: "App · Lịch Đăng Bài Tự Động",
        tag: "Schedule",
        price: 3,
        icon: LayoutTemplate,
        shortDesc: "App AI lên lịch và tự đăng bài theo khung giờ vàng cho từng kênh.",
        longDesc:
          "Đang phát triển — soạn sẵn nội dung một lần, app tự sắp lịch và đăng bài lên các kênh mạng xã hội đúng khung giờ vàng, không cần ngồi canh giờ đăng thủ công mỗi ngày.",
        features: [
          "Soạn nội dung một lần, tự đăng nhiều ngày",
          "Tự chọn khung giờ vàng theo từng kênh",
          "Không cần canh giờ đăng thủ công",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0304",
        title: "App · Quản Lý Đơn Hàng Mini",
        tag: "Orders",
        price: 3,
        icon: ShoppingBag,
        shortDesc: "App AI tổng hợp đơn hàng từ nhiều kênh về một nơi duy nhất.",
        longDesc:
          "Đang phát triển — gộp đơn hàng từ Facebook, Zalo, sàn thương mại điện tử về một bảng theo dõi duy nhất, giúp bạn không bỏ sót đơn và biết ngay tình trạng từng đơn hàng.",
        features: [
          "Gộp đơn từ nhiều kênh bán hàng về một nơi",
          "Theo dõi tình trạng từng đơn hàng",
          "Không bỏ sót đơn khi bán nhiều kênh cùng lúc",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0305",
        title: "App · Tổng Hợp Báo Cáo Bán Hàng",
        tag: "Report",
        price: 3,
        icon: Layers,
        shortDesc: "App AI tự tổng hợp doanh số, đơn hàng thành báo cáo dễ hiểu mỗi ngày.",
        longDesc:
          "Đang phát triển — app tự tổng hợp số liệu bán hàng hằng ngày thành báo cáo trực quan, dễ đọc, giúp bạn nắm tình hình kinh doanh nhanh mà không cần tự làm bảng tính.",
        features: [
          "Tự tổng hợp số liệu bán hàng mỗi ngày",
          "Báo cáo trực quan, dễ đọc",
          "Không cần tự làm bảng tính thủ công",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0306",
        title: "App · Trợ Lý Trả Lời Bình Luận",
        tag: "Comment",
        price: 3,
        icon: MessageCircle,
        shortDesc: "App AI tự trả lời bình luận trên bài đăng theo đúng chất giọng thương hiệu.",
        longDesc:
          "Đang phát triển — app AI tự đọc và trả lời bình luận trên bài đăng Facebook theo đúng chất giọng thương hiệu, giúp bạn không bỏ lỡ tương tác với khách hàng khi bài viết lên cao trào.",
        features: [
          "Tự trả lời bình luận theo chất giọng thương hiệu",
          "Không bỏ lỡ tương tác khi bài viết lên cao trào",
          "Gắn cờ các bình luận cần bạn trả lời tay",
          "Sắp ra mắt",
        ],
      },
    ],
  },
  {
    id: "landing",
    title: "LANDING PAGE · Trang Bán Hàng Dựng Sẵn — Ra Mắt Trong 24H",
    subtitle: "Landing page đơn giản, dựng nhanh, tối ưu chốt đơn — trọn gói $5",
    products: [
      {
        id: "S0401",
        title: "Landing Page · Trang Chốt Đơn 1 Sản Phẩm",
        tag: "Funnel",
        price: 5,
        icon: Rocket,
        bestseller: true,
        shortDesc:
          "Landing page đơn giản 1 trang, tối ưu để chốt đơn nhanh cho 1 sản phẩm chủ lực.",
        longDesc:
          "Đang phát triển — landing page dựng sẵn theo cấu trúc đã kiểm chứng: hero gây ấn tượng, phần lợi ích, bằng chứng xã hội và nút chốt đơn — sắp xếp đúng thứ tự tâm lý mua hàng, dựng xong trong 24 giờ.",
        features: [
          "1 trang, tập trung chốt đơn 1 sản phẩm chủ lực",
          "Cấu trúc 7 khối đã kiểm chứng chuyển đổi",
          "Dựng xong và bàn giao trong 24 giờ",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0402",
        title: "Landing Page · Trang Giới Thiệu Dịch Vụ",
        tag: "Service",
        price: 5,
        icon: PenTool,
        shortDesc: "Landing page giới thiệu dịch vụ, nhấn mạnh lợi ích và lý do nên chọn bạn.",
        longDesc:
          "Đang phát triển — landing page dựng sẵn dành cho người bán dịch vụ, trình bày rõ lợi ích, quy trình làm việc và lý do khách hàng nên chọn bạn thay vì đối thủ.",
        features: [
          "Trình bày rõ lợi ích và quy trình dịch vụ",
          "Có phần lý do nên chọn bạn thay vì đối thủ",
          "Dựng xong và bàn giao trong 24 giờ",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0403",
        title: "Landing Page · Trang Ưu Đãi Giới Hạn",
        tag: "Offer",
        price: 5,
        icon: Gift,
        shortDesc: "Landing page cho chương trình ưu đãi có thời hạn, tạo cảm giác khan hiếm.",
        longDesc:
          "Đang phát triển — landing page dựng riêng cho chương trình khuyến mãi ngắn hạn, có bộ đếm ngược và bố cục nhấn mạnh sự khan hiếm để thúc đẩy khách hàng quyết định nhanh.",
        features: [
          "Có bộ đếm ngược thời gian ưu đãi",
          "Bố cục nhấn mạnh sự khan hiếm hợp lý",
          "Dựng xong và bàn giao trong 24 giờ",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0404",
        title: "Landing Page · Trang Đăng Ký Nhận Tư Vấn",
        tag: "Lead",
        price: 5,
        icon: CreditCard,
        shortDesc: "Landing page thu thập thông tin khách hàng tiềm năng, chuyển hoá thành lead.",
        longDesc:
          "Đang phát triển — landing page tối ưu để thu thập thông tin liên hệ khách hàng tiềm năng, kèm biểu mẫu đăng ký rút gọn giúp tăng tỷ lệ để lại thông tin.",
        features: [
          "Biểu mẫu đăng ký rút gọn, tăng tỷ lệ điền",
          "Tối ưu để thu thập khách hàng tiềm năng",
          "Dựng xong và bàn giao trong 24 giờ",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0405",
        title: "Landing Page · Trang Ra Mắt Sản Phẩm Mới",
        tag: "Launch",
        price: 5,
        icon: TrendingUp,
        shortDesc: "Landing page dành riêng cho ngày ra mắt sản phẩm hoặc dịch vụ mới.",
        longDesc:
          "Đang phát triển — landing page dựng riêng cho chiến dịch ra mắt, giúp tạo hiệu ứng chú ý và thúc đẩy đơn hàng đầu tiên ngay trong những ngày ra mắt.",
        features: [
          "Tối ưu cho hiệu ứng ra mắt sản phẩm mới",
          "Thúc đẩy đơn hàng đầu tiên trong ngày ra mắt",
          "Dựng xong và bàn giao trong 24 giờ",
          "Sắp ra mắt",
        ],
      },
      {
        id: "S0406",
        title: "Landing Page · Trang Đánh Giá & Chứng Thực",
        tag: "Trust",
        price: 5,
        icon: Star,
        shortDesc: "Landing page trưng bày đánh giá, chứng thực khách hàng để tăng độ tin cậy.",
        longDesc:
          "Đang phát triển — landing page tập trung trình bày đánh giá thật từ khách hàng theo cách thuyết phục nhất, giúp người lạ tin tưởng và quyết định mua nhanh hơn.",
        features: [
          "Trình bày chứng thực khách hàng thuyết phục",
          "Tăng độ tin cậy cho người mua lần đầu",
          "Dựng xong và bàn giao trong 24 giờ",
          "Sắp ra mắt",
        ],
      },
    ],
  },
  {
    id: "course",
    title: "WEB RIÊNG · Website Thương Hiệu Của Bạn — Thiết Kế Theo Yêu Cầu",
    subtitle: "Website đầy đủ, thiết kế riêng theo nhu cầu — liên hệ để nhận báo giá",
    products: [
      {
        id: "S0501",
        title: "Web · Website Bán Hàng Trọn Gói",
        tag: "E-commerce",
        price: 0,
        icon: Globe,
        contactOnly: true,
        shortDesc:
          "Website bán hàng đầy đủ, có giỏ hàng và thanh toán, thiết kế theo đúng thương hiệu bạn.",
        longDesc:
          "Website được thiết kế riêng theo đúng nhu cầu của bạn — không phải sản phẩm đóng gói sẵn nên không có giá cố định. Nhắn Zalo để được tư vấn phạm vi công việc và nhận báo giá cụ thể.",
        features: [
          "Thiết kế riêng theo đúng thương hiệu của bạn",
          "Có giỏ hàng và thanh toán đầy đủ",
          "Báo giá cụ thể sau khi trao đổi yêu cầu",
          "Liên hệ Zalo để được tư vấn",
        ],
      },
      {
        id: "S0502",
        title: "Web · Website Giới Thiệu Doanh Nghiệp",
        tag: "Corporate",
        price: 0,
        icon: Building2,
        contactOnly: true,
        shortDesc:
          "Website giới thiệu công ty, dịch vụ, năng lực — chuyên nghiệp, đúng chuẩn thương hiệu.",
        longDesc:
          "Website được thiết kế riêng theo đúng nhu cầu của bạn — không phải sản phẩm đóng gói sẵn nên không có giá cố định. Nhắn Zalo để được tư vấn phạm vi công việc và nhận báo giá cụ thể.",
        features: [
          "Thiết kế chuyên nghiệp, đúng chuẩn thương hiệu",
          "Trình bày rõ dịch vụ và năng lực doanh nghiệp",
          "Báo giá cụ thể sau khi trao đổi yêu cầu",
          "Liên hệ Zalo để được tư vấn",
        ],
      },
      {
        id: "S0503",
        title: "Web · Website Đặt Lịch / Đặt Chỗ",
        tag: "Booking",
        price: 0,
        icon: Monitor,
        contactOnly: true,
        shortDesc:
          "Website cho khách tự đặt lịch, đặt chỗ trực tuyến, giảm việc trả lời tin nhắn thủ công.",
        longDesc:
          "Website được thiết kế riêng theo đúng nhu cầu của bạn — không phải sản phẩm đóng gói sẵn nên không có giá cố định. Nhắn Zalo để được tư vấn phạm vi công việc và nhận báo giá cụ thể.",
        features: [
          "Khách tự đặt lịch, đặt chỗ trực tuyến",
          "Giảm việc trả lời tin nhắn đặt lịch thủ công",
          "Báo giá cụ thể sau khi trao đổi yêu cầu",
          "Liên hệ Zalo để được tư vấn",
        ],
      },
      {
        id: "S0504",
        title: "Web · Website Khóa Học Trực Tuyến",
        tag: "E-learning",
        price: 0,
        icon: Presentation,
        contactOnly: true,
        shortDesc: "Website riêng để đăng và bán khóa học trực tuyến, quản lý học viên.",
        longDesc:
          "Website được thiết kế riêng theo đúng nhu cầu của bạn — không phải sản phẩm đóng gói sẵn nên không có giá cố định. Nhắn Zalo để được tư vấn phạm vi công việc và nhận báo giá cụ thể.",
        features: [
          "Đăng và bán khóa học trực tuyến riêng",
          "Quản lý học viên trên chính website của bạn",
          "Báo giá cụ thể sau khi trao đổi yêu cầu",
          "Liên hệ Zalo để được tư vấn",
        ],
      },
      {
        id: "S0505",
        title: "Web · Website Cộng Đồng Thành Viên",
        tag: "Community",
        price: 0,
        icon: Users,
        contactOnly: true,
        shortDesc: "Website riêng cho cộng đồng thành viên trả phí, nội dung độc quyền.",
        longDesc:
          "Website được thiết kế riêng theo đúng nhu cầu của bạn — không phải sản phẩm đóng gói sẵn nên không có giá cố định. Nhắn Zalo để được tư vấn phạm vi công việc và nhận báo giá cụ thể.",
        features: [
          "Không gian cộng đồng riêng, không lệ thuộc nền tảng thứ ba",
          "Quản lý thành viên và nội dung độc quyền",
          "Báo giá cụ thể sau khi trao đổi yêu cầu",
          "Liên hệ Zalo để được tư vấn",
        ],
      },
      {
        id: "S0506",
        title: "Web · Website Portfolio Cá Nhân",
        tag: "Portfolio",
        price: 0,
        icon: Compass,
        contactOnly: true,
        shortDesc: "Website portfolio cá nhân chuyên nghiệp, trưng bày dự án và thành tích.",
        longDesc:
          "Website được thiết kế riêng theo đúng nhu cầu của bạn — không phải sản phẩm đóng gói sẵn nên không có giá cố định. Nhắn Zalo để được tư vấn phạm vi công việc và nhận báo giá cụ thể.",
        features: [
          "Trưng bày dự án và thành tích chuyên nghiệp",
          "Thiết kế riêng theo cá tính thương hiệu cá nhân",
          "Báo giá cụ thể sau khi trao đổi yêu cầu",
          "Liên hệ Zalo để được tư vấn",
        ],
      },
    ],
  },
];

export const categories: Category[] = seed.map((cat) => ({
  id: cat.id,
  title: cat.title,
  subtitle: cat.subtitle,
  products: cat.products.map((p) => ({ ...p, categoryId: cat.id })),
}));

export const allProducts: Product[] = categories.flatMap((c) => c.products);

export const getProduct = (id: string) => allProducts.find((p) => p.id === id);

export const getCategory = (id: string) => categories.find((c) => c.id === id);

// Dải màu cam Hỏa → vàng gold → xanh Mộc, hài hòa xuyên suốt 6 sảnh.
export const iconGradients: Record<string, string> = {
  ready: "from-[oklch(0.64_0.13_152)] to-[oklch(0.80_0.11_155)]",
  poster: "from-[oklch(0.70_0.19_45)] to-[oklch(0.81_0.15_68)]",
  lifestyle: "from-[oklch(0.75_0.14_60)] to-[oklch(0.85_0.10_80)]",
  video: "from-[oklch(0.62_0.18_35)] to-[oklch(0.72_0.18_50)]",
  landing: "from-[oklch(0.62_0.10_170)] to-[oklch(0.75_0.10_155)]",
  course: "from-[oklch(0.58_0.11_152)] to-[oklch(0.75_0.11_150)]",
};

// Dải màu dự phòng cho sảnh mới thêm qua Supabase (không có sẵn trong iconGradients ở trên).
const FALLBACK_GRADIENTS: string[] = [
  "from-[oklch(0.66_0.16_35)] to-[oklch(0.80_0.13_60)]",
  "from-[oklch(0.60_0.14_230)] to-[oklch(0.76_0.11_215)]",
  "from-[oklch(0.62_0.17_320)] to-[oklch(0.78_0.13_335)]",
  "from-[oklch(0.58_0.14_140)] to-[oklch(0.74_0.12_150)]",
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Màu gradient của 1 sảnh — 6 sảnh có sẵn dùng đúng màu đã định ở trên; sảnh mới thêm qua
 * Supabase tự chọn 1 màu ổn định trong bảng dự phòng theo tên sảnh, không cần khai báo riêng. */
export function getCategoryGradient(categoryId: string): string {
  return (
    iconGradients[categoryId] ??
    FALLBACK_GRADIENTS[hashString(categoryId) % FALLBACK_GRADIENTS.length]
  );
}

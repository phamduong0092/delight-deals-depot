import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Camera,
  Clapperboard,
  Coffee,
  Compass,
  CreditCard,
  Dumbbell,
  Film,
  FileText,
  Gift,
  Glasses,
  Globe,
  Mic,
  Mic2,
  Monitor,
  Newspaper,
  PartyPopper,
  PenTool,
  Palmtree,
  Presentation,
  Radio,
  Rocket,
  Shirt,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import kolGym from "@/assets/kol-gym.asset.json";
import kolGymVideo from "@/assets/kol-gym-video.mp4.asset.json";
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
    id: "poster",
    title: "Sảnh I · Skill Thương Hiệu Cá Nhân",
    subtitle: "Bộ kỹ năng xây dựng hình ảnh KOL đẳng cấp — từ định vị đến sân khấu",
    products: [
      {
        id: "graduation",
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
        id: "launch",
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
        id: "honor",
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
        id: "workshop",
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
        id: "story-brand",
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
        id: "pr-media",
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
    title: "Sảnh II · Skill Hình Ảnh Cá Nhân",
    subtitle: "Kỹ năng dựng chân dung đời thực — bán hàng bằng sự tin cậy",
    products: [
      {
        id: "gym",
        title: "Skill · Selfie Chuyển Động",
        tag: "Video Pack",
        price: 2,
        icon: Dumbbell,
        image: kolGym.url,
        video: kolGymVideo.url,
        bestseller: true,
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
        id: "outfit",
        title: "Skill · Phối Đồ Bán Hàng",
        tag: "Style",
        price: 2,
        icon: Shirt,
        shortDesc: "Kỹ năng phối đồ tạo thiện cảm, tăng độ tin cậy khi bán hàng.",
        longDesc:
          "Skill Pack tổng hợp công thức phối đồ theo từng loại nội dung bán hàng: livestream, ảnh sản phẩm, video ngắn. Giúp bạn trông chuyên nghiệp nhưng vẫn gần gũi, dễ tạo thiện cảm với khách hàng.",
        features: [
          "10 công thức phối đồ theo bối cảnh",
          "Bảng màu trang phục hợp mọi tông da",
          "Gợi ý phụ kiện tăng điểm chuyên nghiệp",
          "Lưu ý phối đồ khi lên hình quay video",
        ],
      },
      {
        id: "street",
        title: "Skill · Street Storytelling",
        tag: "Story",
        price: 2,
        icon: Glasses,
        shortDesc: "Kỹ năng kể chuyện qua ảnh đường phố, phong cách tự nhiên.",
        longDesc:
          "Bộ kỹ năng dựng ảnh phong cách đường phố kể chuyện đời thường, tạo cảm giác chân thật và gần gũi — giúp nội dung nổi bật giữa hàng loạt ảnh studio dàn dựng quá mức.",
        features: [
          "Bộ góc máy chụp đường phố tự nhiên",
          "Hướng dẫn chọn bối cảnh kể chuyện",
          "Mẫu caption đời thường tăng tương tác",
          "Cách xử lý ánh sáng ngoài trời",
        ],
      },
      {
        id: "studio",
        title: "Skill · Chân Dung Cao Cấp",
        tag: "Luxury",
        price: 2,
        icon: Camera,
        shortDesc: "Kỹ năng dựng ảnh chân dung studio sang trọng, đẳng cấp.",
        longDesc:
          "Skill Pack hướng dẫn dàn dựng ảnh chân dung studio theo phong cách cao cấp: ánh sáng, backdrop, biểu cảm — phù hợp làm ảnh đại diện thương hiệu hoặc bìa hồ sơ năng lực.",
        features: [
          "Sơ đồ ánh sáng studio 3 điểm",
          "Hướng dẫn tạo dáng chân dung tự tin",
          "Bảng phối backdrop sang trọng",
          "Preset màu hậu kỳ chuẩn cao cấp",
        ],
      },
      {
        id: "travel",
        title: "Skill · Lifestyle Du Lịch",
        tag: "Journey",
        price: 2,
        icon: Palmtree,
        shortDesc: "Kỹ năng dựng nội dung du lịch truyền cảm hứng, gắn thương hiệu.",
        longDesc:
          "Bộ kỹ năng giúp bạn biến mỗi chuyến đi thành nội dung bán hàng: kể câu chuyện hành trình gắn liền thông điệp thương hiệu, giữ chân người xem bằng cảm xúc trải nghiệm thật.",
        features: [
          "Khung kịch bản series du lịch 5 tập",
          "Gợi ý địa điểm chụp theo phong cách thương hiệu",
          "Mẫu caption hành trình truyền cảm hứng",
          "Cách lồng ghép thông điệp bán hàng tự nhiên",
        ],
      },
      {
        id: "daily",
        title: "Skill · Nhật Ký Đời Thường",
        tag: "Daily",
        price: 2,
        icon: Coffee,
        shortDesc: "Kỹ năng dựng nội dung đời thường tăng độ gần gũi, tin cậy.",
        longDesc:
          "Skill Pack giúp bạn biến những khoảnh khắc đời thường thành nội dung đều đặn, giữ kết nối với người theo dõi mỗi ngày mà không tốn công dàn dựng cầu kỳ.",
        features: [
          "30 ý tưởng nội dung đời thường mỗi tháng",
          "Công thức caption gần gũi, tăng tương tác",
          "Lịch đăng bài tối ưu theo khung giờ vàng",
          "Mẹo quay chụp nhanh bằng điện thoại",
        ],
      },
    ],
  },
  {
    id: "video",
    title: "Sảnh III · Skill Video & TVC",
    subtitle: "Kỹ năng dựng video quảng cáo — từ kịch bản đến TVC chuẩn thương hiệu",
    products: [
      {
        id: "tvc-brand",
        title: "Skill · TVC Thương Hiệu",
        tag: "Cinematic",
        price: 2,
        icon: Film,
        shortDesc: "Kỹ năng dựng TVC thương hiệu điện ảnh, chuyên nghiệp.",
        longDesc:
          "Skill Pack hướng dẫn quy trình dựng TVC từ concept đến hậu kỳ: chọn bối cảnh điện ảnh, nhịp dựng cảm xúc và âm thanh tạo chiều sâu thương hiệu.",
        features: [
          "Khung kịch bản TVC 30-60 giây",
          "Bảng phân cảnh (storyboard) mẫu",
          "Gợi ý nhạc nền theo tông thương hiệu",
          "Checklist hậu kỳ màu điện ảnh",
        ],
      },
      {
        id: "script",
        title: "Skill · Kịch Bản 30 Giây",
        tag: "Script",
        price: 2,
        icon: FileText,
        shortDesc: "Kỹ năng viết kịch bản video ngắn chốt đơn trong 30 giây.",
        longDesc:
          "Công thức viết kịch bản video ngắn giữ chân người xem 3 giây đầu và dẫn dắt đến hành động mua hàng trước khi hết 30 giây — tối ưu cho quảng cáo và nội dung ngắn.",
        features: [
          "Công thức hook 3 giây đầu",
          "20 mẫu kịch bản 30 giây theo ngành hàng",
          "Khung CTA chốt đơn tự nhiên",
          "Bảng kiểm nhịp độ kịch bản",
        ],
      },
      {
        id: "reels",
        title: "Skill · Reels Chuyển Cảnh",
        tag: "Reels",
        price: 2,
        icon: Clapperboard,
        shortDesc: "Kỹ năng dựng Reels chuyển cảnh mượt, bắt trend giữ tương tác.",
        longDesc:
          "Skill Pack tổng hợp các kỹ thuật chuyển cảnh Reels đang thịnh hành, cách bắt nhịp nhạc và dựng video giữ chân người xem đến giây cuối cùng.",
        features: [
          "10 kỹ thuật chuyển cảnh đang trend",
          "Hướng dẫn bắt nhịp nhạc khi dựng",
          "Template dựng Reels dựng sẵn",
          "Checklist tối ưu tỷ lệ xem hết video",
        ],
      },
      {
        id: "unbox",
        title: "Skill · Video Review Sản Phẩm",
        tag: "Review",
        price: 2,
        icon: Clapperboard,
        shortDesc: "Kỹ năng quay video unbox, review sản phẩm chân thực, thuyết phục.",
        longDesc:
          "Bộ kỹ năng giúp bạn dựng video review sản phẩm chân thực, nhấn mạnh lợi ích thực tế và xử lý phản đối của khách hàng ngay trong video.",
        features: [
          "Khung kịch bản unbox 3 phần",
          "Cách quay cận sản phẩm nổi bật chi tiết",
          "Kỹ thuật xử lý phản đối trong video",
          "Mẫu caption thúc đẩy mua ngay",
        ],
      },
      {
        id: "livestream",
        title: "Skill · Livestream Bán Hàng",
        tag: "Live",
        price: 2,
        icon: Radio,
        bestseller: true,
        shortDesc: "Kỹ năng dẫn livestream chốt đơn liên tục, giữ chân người xem.",
        longDesc:
          "Skill Pack đúc kết kịch bản dẫn livestream bán hàng chuyên nghiệp: cách mở đầu thu hút, giữ nhịp tương tác, xử lý bình luận và chốt đơn theo khung giờ vàng.",
        features: [
          "Kịch bản mở đầu livestream 5 phút",
          "Kỹ thuật giữ nhịp tương tác liên tục",
          "Bộ câu trả lời bình luận thường gặp",
          "Lịch khung giờ vàng livestream theo ngành",
        ],
      },
      {
        id: "voice",
        title: "Skill · Giọng Đọc & Lồng Tiếng",
        tag: "Audio",
        price: 2,
        icon: Mic2,
        shortDesc: "Kỹ năng luyện giọng đọc, lồng tiếng truyền cảm cho video bán hàng.",
        longDesc:
          "Bộ kỹ năng luyện giọng nói tự tin, truyền cảm, đúng nhịp cho video bán hàng và quảng cáo — kèm bài tập khởi động giọng trước khi ghi âm.",
        features: [
          "Bài tập khởi động giọng trước ghi âm",
          "Kỹ thuật nhấn nhá tạo cảm xúc",
          "Mẫu kịch bản lồng tiếng quảng cáo",
          "Hướng dẫn setup thu âm tại nhà",
        ],
      },
    ],
  },
  {
    id: "landing",
    title: "Sảnh IV · Skill Trang Bán Hàng",
    subtitle: "Bộ kỹ năng dựng landing page chốt đơn — thiết kế, copy và chuyển đổi",
    products: [
      {
        id: "hero",
        title: "Skill · Landing Chốt Đơn",
        tag: "Funnel",
        price: 2,
        icon: Rocket,
        bestseller: true,
        shortDesc: "Kỹ năng dựng landing page chốt đơn tối ưu tỷ lệ chuyển đổi.",
        longDesc:
          "Skill Pack cung cấp cấu trúc landing page đã kiểm chứng: hero gây ấn tượng, phần lợi ích, bằng chứng xã hội và CTA chốt đơn — sắp xếp đúng thứ tự tâm lý mua hàng.",
        features: [
          "Cấu trúc landing page 7 khối chuẩn",
          "Công thức viết hero section",
          "Vị trí đặt CTA tối ưu chuyển đổi",
          "Checklist tối ưu tốc độ tải trang",
        ],
      },
      {
        id: "copy",
        title: "Skill · Copywriting Bán Hàng",
        tag: "Copy",
        price: 2,
        icon: PenTool,
        shortDesc: "Kỹ năng viết copy bán hàng thuyết phục, đánh trúng nỗi đau khách hàng.",
        longDesc:
          "Skill Pack tổng hợp công thức copywriting AIDA và PAS ứng dụng thực chiến, giúp bạn viết nội dung bán hàng chạm đúng nỗi đau và mong muốn của khách hàng mục tiêu.",
        features: [
          "Công thức AIDA & PAS ứng dụng thực chiến",
          "Ngân hàng 100 câu mở đầu thu hút",
          "Bộ từ khóa kích hoạt cảm xúc mua hàng",
          "Mẫu bài đăng bán hàng theo từng ngành",
        ],
      },
      {
        id: "offer",
        title: "Skill · Thiết Kế Offer",
        tag: "Offer",
        price: 2,
        icon: Gift,
        shortDesc: "Kỹ năng thiết kế ưu đãi khó từ chối, tăng tỷ lệ chốt đơn.",
        longDesc:
          "Bộ kỹ năng giúp bạn xây dựng offer hấp dẫn: đóng gói giá trị, tạo cảm giác khan hiếm và giảm rủi ro cho khách hàng để họ quyết định mua nhanh hơn.",
        features: [
          "Công thức đóng gói giá trị offer",
          "Kỹ thuật tạo khan hiếm hợp lý",
          "Mẫu chính sách bảo đảm giảm rủi ro",
          "Bảng so sánh gói mua hàng hiệu quả",
        ],
      },
      {
        id: "checkout",
        title: "Skill · Tối Ưu Thanh Toán",
        tag: "Checkout",
        price: 2,
        icon: CreditCard,
        shortDesc: "Kỹ năng tối ưu trải nghiệm thanh toán, giảm bỏ giỏ hàng.",
        longDesc:
          "Skill Pack hướng dẫn tối ưu luồng thanh toán: rút gọn bước nhập liệu, hiển thị rõ ràng phương thức thanh toán và xử lý tâm lý do dự trước khi khách hàng rời trang.",
        features: [
          "Checklist rút gọn luồng thanh toán",
          "Cách trình bày phương thức thanh toán rõ ràng",
          "Kỹ thuật xử lý tâm lý do dự cuối phễu",
          "Mẫu thông báo xác nhận đơn hàng",
        ],
      },
      {
        id: "upsell",
        title: "Skill · Upsell & Combo",
        tag: "Growth",
        price: 2,
        icon: TrendingUp,
        shortDesc: "Kỹ năng thiết kế upsell và combo tăng giá trị đơn hàng.",
        longDesc:
          "Bộ kỹ năng giúp bạn thiết kế các gói combo và upsell hợp lý ngay tại thời điểm khách hàng vừa quyết định mua, tăng giá trị trung bình mỗi đơn hàng mà không gây khó chịu.",
        features: [
          "Công thức thiết kế combo hấp dẫn",
          "Thời điểm vàng để đề xuất upsell",
          "Mẫu lời mời upsell không gây khó chịu",
          "Bảng theo dõi hiệu quả upsell",
        ],
      },
      {
        id: "trust",
        title: "Skill · Chứng Thực Khách Hàng",
        tag: "Trust",
        price: 2,
        icon: Star,
        shortDesc: "Kỹ năng thu thập và trình bày chứng thực tăng độ tin cậy.",
        longDesc:
          "Skill Pack hướng dẫn cách khai thác đánh giá thật từ khách hàng và trình bày chúng theo cách thuyết phục nhất — yếu tố then chốt giúp người lạ tin tưởng và mua hàng.",
        features: [
          "Kịch bản xin đánh giá sau mua hàng",
          "Bộ câu hỏi khai thác chứng thực chất lượng",
          "Mẫu trình bày testimonial chuyển đổi cao",
          "Cách xử lý đánh giá tiêu cực khéo léo",
        ],
      },
    ],
  },
  {
    id: "course",
    title: "Sảnh V · Skill Khóa Học",
    subtitle: "Kỹ năng đóng gói tri thức thành khóa học và bán hàng tự động",
    products: [
      {
        id: "curriculum",
        title: "Skill · Thiết Kế Giáo Trình",
        tag: "Blueprint",
        price: 2,
        icon: Compass,
        shortDesc: "Kỹ năng thiết kế giáo trình khóa học logic, dễ tiếp thu.",
        longDesc:
          "Skill Pack hướng dẫn quy trình thiết kế giáo trình từ mục tiêu học tập đến lộ trình bài giảng, đảm bảo học viên tiếp thu hiệu quả và đạt kết quả rõ ràng.",
        features: [
          "Khung thiết kế mục tiêu học tập",
          "Mẫu lộ trình khóa học 8 tuần",
          "Công thức chia module dễ tiếp thu",
          "Checklist rà soát giáo trình trước khi ra mắt",
        ],
      },
      {
        id: "slide",
        title: "Skill · Slide Giảng Dạy",
        tag: "Deck",
        price: 2,
        icon: Monitor,
        shortDesc: "Kỹ năng thiết kế slide giảng dạy chuyên nghiệp, dễ theo dõi.",
        longDesc:
          "Bộ kỹ năng giúp bạn dựng slide bài giảng rõ ràng, đẹp mắt và đúng chuẩn sư phạm — giữ sự tập trung của học viên trong suốt buổi học.",
        features: [
          "Bộ template slide giảng dạy chuyên nghiệp",
          "Nguyên tắc trình bày thông tin dễ theo dõi",
          "Bảng phối màu và font chữ chuẩn",
          "Mẹo thiết kế slide tương tác cao",
        ],
      },
      {
        id: "record",
        title: "Skill · Quay Bài Giảng",
        tag: "Studio",
        price: 2,
        icon: Video,
        shortDesc: "Kỹ năng quay video bài giảng chất lượng cao tại nhà.",
        longDesc:
          "Skill Pack hướng dẫn setup góc quay, ánh sáng và âm thanh để tự quay bài giảng chất lượng studio ngay tại nhà, không cần thiết bị đắt tiền.",
        features: [
          "Sơ đồ setup góc quay tại nhà",
          "Hướng dẫn ánh sáng và âm thanh cơ bản",
          "Checklist trước khi bấm quay",
          "Mẹo dựng hậu kỳ nhanh gọn",
        ],
      },
      {
        id: "community",
        title: "Skill · Vận Hành Cộng Đồng",
        tag: "Community",
        price: 2,
        icon: Users,
        shortDesc: "Kỹ năng xây dựng và vận hành cộng đồng học viên gắn kết.",
        longDesc:
          "Bộ kỹ năng giúp bạn xây dựng cộng đồng học viên sôi nổi, giữ tỷ lệ hoàn thành khóa học cao và tạo môi trường lan tỏa truyền miệng tự nhiên.",
        features: [
          "Khung quy tắc cộng đồng rõ ràng",
          "Lịch hoạt động tương tác cộng đồng hàng tuần",
          "Kỹ thuật giữ tỷ lệ hoàn thành khóa học cao",
          "Mẫu chương trình vinh danh học viên xuất sắc",
        ],
      },
      {
        id: "webinar",
        title: "Skill · Webinar Chốt Học Viên",
        tag: "Webinar",
        price: 2,
        icon: Presentation,
        shortDesc: "Kỹ năng dẫn webinar chốt học viên chuyên nghiệp, hiệu quả.",
        longDesc:
          "Skill Pack đúc kết kịch bản webinar bán khóa học đã kiểm chứng: từ mở đầu thu hút, giảng dạy giá trị thật đến phần chốt ưu đãi giới hạn thời gian.",
        features: [
          "Kịch bản webinar 60 phút chuẩn chuyển đổi",
          "Cấu trúc giảng dạy giá trị trước khi chốt",
          "Mẫu slide ưu đãi giới hạn thời gian",
          "Kịch bản xử lý câu hỏi cuối buổi",
        ],
      },
      {
        id: "affiliate",
        title: "Skill · Hệ Thống Affiliate",
        tag: "Scale",
        price: 2,
        icon: Globe,
        shortDesc: "Kỹ năng xây dựng hệ thống affiliate nhân bản doanh số.",
        longDesc:
          "Bộ kỹ năng hướng dẫn thiết kế chương trình affiliate hấp dẫn, tuyển và đào tạo đối tác bán hàng để nhân bản doanh số mà không cần tự mình bán tất cả.",
        features: [
          "Khung thiết kế chính sách hoa hồng hợp lý",
          "Bộ tài liệu đào tạo đối tác affiliate",
          "Kịch bản tuyển đối tác bán hàng",
          "Bảng theo dõi hiệu quả hệ thống affiliate",
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

// Dải màu cam Hỏa → vàng gold → xanh Mộc, hài hòa xuyên suốt 5 sảnh.
export const iconGradients: Record<string, string> = {
  poster: "from-[oklch(0.70_0.19_45)] to-[oklch(0.81_0.15_68)]",
  lifestyle: "from-[oklch(0.75_0.14_60)] to-[oklch(0.85_0.10_80)]",
  video: "from-[oklch(0.62_0.18_35)] to-[oklch(0.72_0.18_50)]",
  landing: "from-[oklch(0.62_0.10_170)] to-[oklch(0.75_0.10_155)]",
  course: "from-[oklch(0.58_0.11_152)] to-[oklch(0.75_0.11_150)]",
};

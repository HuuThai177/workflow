"use client";

import React, { useState } from "react";
import { 
  GitBranch, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Users, 
  FileText, 
  Activity, 
  Clock, 
  ChevronRight, 
  Calendar, 
  DollarSign, 
  ShoppingCart, 
  MessageSquare, 
  UserPlus, 
  Briefcase, 
  AlertTriangle, 
  Megaphone,
  Play,
  ArrowRight,
  Shield,
  Layers,
  Database
} from "lucide-react";

// Types for workflow templates
interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgLight: string;
  steps: string[];
}

export default function Home() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>("1");

  const workflowTemplates: WorkflowTemplate[] = [
    {
      id: "1",
      name: "Quy trình xin nghỉ phép",
      description: "Quản lý ngày nghỉ của nhân viên, kiểm tra hạn mức phép và tự động cập nhật bảng công.",
      icon: <Calendar className="w-6 h-6 text-emerald-500" />,
      color: "emerald",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50",
      steps: ["Nhân viên gửi đơn", "Quản lý trực tiếp duyệt", "Bộ phận Nhân sự (HR) lưu hồ sơ"],
    },
    {
      id: "2",
      name: "Quy trình duyệt chi phí",
      description: "Duyệt các khoản chi lẻ, thanh toán hóa đơn hoặc tạm ứng công tác phí.",
      icon: <DollarSign className="w-6 h-6 text-amber-500" />,
      color: "amber",
      bgLight: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50",
      steps: ["Đề xuất chi phí", "Trưởng phòng duyệt", "Kế toán trưởng kiểm tra", "Giám đốc phê duyệt chi"],
    },
    {
      id: "3",
      name: "Quy trình mua thiết bị",
      description: "Đăng ký mua sắm trang thiết bị làm việc, máy tính, văn phòng phẩm mới.",
      icon: <ShoppingCart className="w-6 h-6 text-blue-500" />,
      color: "blue",
      bgLight: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50",
      steps: ["Đề xuất thiết bị", "Quản lý duyệt nhu cầu", "Bộ phận mua sắm báo giá", "Giám đốc duyệt mua", "Bàn giao & ký nhận"],
    },
    {
      id: "4",
      name: "Quy trình xử lý yêu cầu khách hàng",
      description: "Tiếp nhận khiếu nại, phản hồi của khách hàng và phân phối cho kỹ thuật xử lý.",
      icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
      color: "purple",
      bgLight: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/50",
      steps: ["Tiếp nhận yêu cầu", "CSKH phân loại", "Kỹ thuật viên xử lý", "Khách hàng đánh giá & Đóng"],
    },
    {
      id: "5",
      name: "Quy trình tuyển dụng",
      description: "Quy trình từ đề xuất nhân sự mới, phỏng vấn thử việc cho đến khi onboard.",
      icon: <UserPlus className="w-6 h-6 text-rose-500" />,
      color: "rose",
      bgLight: "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50",
      steps: ["Đề xuất tuyển dụng", "Giám đốc duyệt định biên", "Lọc CV & Phỏng vấn", "Gửi Offer Letter", "Onboarding"],
    },
    {
      id: "6",
      name: "Quy trình giao việc nội bộ",
      description: "Giao chỉ tiêu, công việc chéo giữa các bộ phận kèm deadline và đánh giá kết quả.",
      icon: <Briefcase className="w-6 h-6 text-indigo-500" />,
      color: "indigo",
      bgLight: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/50",
      steps: ["Tạo & Giao việc", "Nhân viên thực hiện", "Nộp báo cáo kết quả", "Quản lý nghiệm thu & Đánh giá"],
    },
    {
      id: "7",
      name: "Quy trình báo lỗi thiết bị",
      description: "Khai báo sự cố hạ tầng, lỗi phần mềm, hỏng hóc máy tính phòng IT.",
      icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
      color: "orange",
      bgLight: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900/50",
      steps: ["Khai báo sự cố", "IT support tiếp nhận", "Khắc phục/Sửa chữa", "Nghiệm thu hoàn tất"],
    },
    {
      id: "8",
      name: "Quy trình duyệt nội dung Marketing",
      description: "Duyệt bài viết Fanpage, thiết kế ấn phẩm truyền thông trước khi công bố.",
      icon: <Megaphone className="w-6 h-6 text-cyan-500" />,
      color: "cyan",
      bgLight: "bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-900/50",
      steps: ["Tạo bản nháp (Draft)", "Trưởng nhóm Content duyệt", "Thiết kế kiểm duyệt hình ảnh", "Đăng tải bài viết"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GitBranch className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                FlowEase
              </span>
              <span className="block text-[10px] text-indigo-400 font-medium tracking-wider uppercase">
                Workflow Management
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Tính năng</a>
            <a href="#templates" className="hover:text-indigo-400 transition-colors">Quy trình mẫu</a>
            <a href="#architecture" className="hover:text-indigo-400 transition-colors">Kiến trúc</a>
            <a href="http://localhost:4000" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
              API Backend <ChevronRight className="w-4 h-4" />
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping"></span>
              API Online: 4000
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-30">
          <div className="absolute top-[-10%] left-[5%] w-[400px] h-[400px] rounded-full bg-indigo-500 blur-[120px]" />
          <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-violet-500 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-indigo-300 mb-6">
              <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-white text-[10px]">NEW</span>
              Giải pháp tự động hóa quy trình cho doanh nghiệp vừa & nhỏ
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Tự động hóa mọi{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Quy Trình Nội Bộ
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Thiết kế quy trình động, gán người chịu trách nhiệm phê duyệt, luân chuyển hồ sơ tự động và kiểm soát lịch sử duyệt minh bạch chỉ trên một nền tảng.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#templates" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all gap-2"
              >
                Khám phá quy trình mẫu
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#architecture" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold text-slate-300 transition-all gap-2"
              >
                Xem cấu trúc hệ thống
              </a>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-20 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="text-center border-r border-slate-700/50 last:border-0">
              <div className="text-3xl font-extrabold text-white">8+ Mẫu</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-medium tracking-wider">Quy trình định sẵn</div>
            </div>
            <div className="text-center md:border-r border-slate-700/50 last:border-0">
              <div className="text-3xl font-extrabold text-indigo-400">0.0s</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-medium tracking-wider">Thời gian luân chuyển</div>
            </div>
            <div className="text-center border-r border-slate-700/50 last:border-0">
              <div className="text-3xl font-extrabold text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-medium tracking-wider">Lịch sử Audit Trail</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-purple-400">JSON</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-medium tracking-wider">Dữ liệu động linh hoạt</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Workflow Templates Section */}
      <section id="templates" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              8 Quy Trình Mẫu Doanh Nghiệp Tự Tạo
            </h2>
            <p className="text-slate-400">
              Chọn bất kỳ quy trình nào dưới đây để xem trực quan các bước phê duyệt tự động của quy trình đó.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Grid list of templates */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {workflowTemplates.map((template) => {
                const isSelected = selectedWorkflow === template.id;
                return (
                  <button
                    key={template.id}
                    onClick={() => setSelectedWorkflow(template.id)}
                    className={`text-left p-5 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-slate-800/80 border-indigo-500 shadow-md shadow-indigo-500/5"
                        : "bg-slate-900 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-lg bg-slate-800">
                        {template.icon}
                      </div>
                      <h3 className="font-semibold text-white text-base leading-tight">
                        {template.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {template.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Step Viewer */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              
              {selectedWorkflow ? (
                (() => {
                  const current = workflowTemplates.find(t => t.id === selectedWorkflow)!;
                  return (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
                          <div className="p-2 bg-slate-800 rounded-lg">
                            {current.icon}
                          </div>
                          <div>
                            <span className="text-[10px] text-indigo-400 uppercase tracking-wider font-semibold">Quy trình đang xem</span>
                            <h4 className="font-bold text-white text-lg">{current.name}</h4>
                          </div>
                        </div>
                        
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                          {current.description}
                        </p>

                        <div className="space-y-6 relative pl-4 border-l border-slate-800">
                          {current.steps.map((step, idx) => (
                            <div key={idx} className="relative group">
                              {/* Connector dot */}
                              <div className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping group-hover:block hidden" />
                              </div>
                              <div>
                                <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                                  Bước {idx + 1}
                                </span>
                                <span className="font-medium text-slate-200 text-sm">
                                  {step}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-800">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>Dữ liệu đầu vào:</span>
                          <span className="font-mono text-indigo-400">JSON schema</span>
                        </div>
                        <button className="w-full mt-4 py-2.5 rounded-lg bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold text-sm border border-indigo-600/20 transition-all flex items-center justify-center gap-1.5">
                          <Plus className="w-4 h-4" />
                          Gửi yêu cầu chạy thử
                        </button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                  Chọn một quy trình mẫu để xem chi tiết các bước.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Database Schema & Engine Flow Visualizer */}
      <section id="architecture" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Cơ Chế Hoạt Động & Kiến Trúc
            </h2>
            <p className="text-slate-400">
              Kiến trúc Backend được đồng bộ hóa trực tiếp với PostgreSQL qua Prisma ORM đảm bảo tối đa hiệu suất và tính nhất quán dữ liệu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Steps process explanation */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/30 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">1. Định nghĩa Template</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Mỗi quy trình mẫu được mô hình hóa trong bảng `Workflow`. Các bước trong quy trình lưu trữ tại `WorkflowStep` bao gồm cấu hình người phụ trách duyệt và số thứ tự bước.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/30 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <Play className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">2. Khởi tạo Instance</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Nhân viên gửi yêu cầu sẽ khởi tạo một bản ghi `WorkflowInstance` liên kết với mẫu. Dữ liệu biểu mẫu được lưu động ở dạng `Json` giúp doanh nghiệp không cần cấu hình lại bảng dữ liệu SQL khi thêm trường thông tin mới.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/30 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">3. Phê duyệt & Ghi log lịch sử</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Mỗi hành động phê duyệt (Approve/Reject) được cập nhật trạng thái yêu cầu và ghi lại một bản ghi `WorkflowLog` để kiểm toán lịch sử đầy đủ (Audit Trail).
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated Database Schema Viewer */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 font-mono text-xs text-slate-400 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-slate-300">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-400" />
                  <span>schema.prisma (Tóm tắt)</span>
                </div>
                <span className="text-[10px] text-slate-500">PostgreSQL</span>
              </div>
              
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                <div>
                  <span className="text-indigo-400">model</span> <span className="text-white">User</span> {"{"}
                  <div className="pl-4">
                    id        <span className="text-slate-500">String @id @default(uuid())</span><br/>
                    email     <span className="text-slate-500">String @unique</span><br/>
                    role      <span className="text-slate-500">Role @default(EMPLOYEE)</span>
                  </div>
                  {"}"}
                </div>

                <div>
                  <span className="text-indigo-400">model</span> <span className="text-white">Workflow</span> {"{"}
                  <div className="pl-4">
                    id        <span className="text-slate-500">String @id @default(uuid())</span><br/>
                    name      <span className="text-slate-500">String</span><br/>
                    steps     <span className="text-slate-500">WorkflowStep[]</span>
                  </div>
                  {"}"}
                </div>

                <div>
                  <span className="text-indigo-400">model</span> <span className="text-white">WorkflowStep</span> {"{"}
                  <div className="pl-4">
                    id         <span className="text-slate-500">String @id @default(uuid())</span><br/>
                    stepOrder  <span className="text-slate-500">Int</span><br/>
                    assigneeId <span className="text-slate-500">String?</span>
                  </div>
                  {"}"}
                </div>

                <div>
                  <span className="text-indigo-400">model</span> <span className="text-white">WorkflowInstance</span> {"{"}
                  <div className="pl-4">
                    id         <span className="text-slate-500">String @id @default(uuid())</span><br/>
                    status     <span className="text-slate-500">InstanceStatus @default(PENDING)</span><br/>
                    data       <span className="text-yellow-500/80">Json</span> <span className="text-slate-600">// Chứa form fields động</span>
                  </div>
                  {"}"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:flex md:items-center md:justify-between text-sm text-slate-500">
          <div>
            <p>© 2026 FlowEase Project. Phát triển bằng NestJS, NextJS và Prisma.</p>
          </div>
          <div className="flex justify-center gap-6 mt-4 md:mt-0">
            <span className="text-slate-400">Backend: Port 4000</span>
            <span className="text-slate-400">Frontend: Port 3000</span>
            <span className="text-slate-400">Database: Port 5432</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

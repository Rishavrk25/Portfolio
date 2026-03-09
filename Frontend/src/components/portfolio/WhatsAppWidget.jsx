import { useState } from 'react';
import { X } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-start font-sans">
      {/* Chat Window */}
      <div 
        className={`bg-[#e5ddd5] w-[320px] rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 origin-bottom-left mb-4 flex flex-col relative ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}
      >
        {/* Background Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none" 
          style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '150px' }}
        ></div>
        
        {/* Header */}
        <div className="bg-[#075e54] text-white p-4 flex items-center justify-between relative z-10 w-full">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="/avatar.jpg" alt="Rishav Kumar" className="w-11 h-11 rounded-full object-cover border-none bg-white" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] rounded-full border-[2px] border-[#075e54]"></div>
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[15px] leading-tight">Rishav Kumar</h3>
              <p className="text-[12px] text-white/90 font-medium">Typically replies within a day</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Chat Body */}
        <div className="pt-4 px-5 pb-6 flex flex-col gap-2.5 relative z-10 min-h-[160px]">
           <div className="flex justify-center mb-1">
             <span className="text-[11px] text-gray-500 font-medium">11:20</span>
           </div>
           
           <div className="bg-white text-[#111b21] rounded-2xl rounded-tl-none py-2 px-3.5 text-[14px] shadow-sm max-w-[85%] w-fit self-start">
             Hi there 👋
           </div>
           <div className="bg-white text-[#111b21] rounded-2xl rounded-tl-[4px] py-2 px-3.5 text-[14px] shadow-sm max-w-[85%] w-fit self-start">
             How can I help you?
           </div>
        </div>
        
        {/* Footer */}
        <div className="px-5 pb-5 bg-transparent flex justify-center w-full relative z-10">
          <a
            href="https://wa.me/918789371641?text=Hello%20Rishav!"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            {whatsappIcon}
            Start Chat
          </a>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-[#25D366] relative"
        aria-label="Toggle WhatsApp chat window"
      >
        <div className="scale-150">
          {whatsappIcon}
        </div>
        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-[2px] border-white rounded-full"></span>
        )}
      </button>
    </div>
  );
}

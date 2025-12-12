import { useState } from "react";
import { Link } from "react-router-dom";
import { Mic, MicOff, Send, Globe, Wifi, MessageSquare, CloudSun, DollarSign, Sprout, Bug, ChevronRight, Leaf, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Quick Action Cards Data
const actionCards = [
  {
    id: "weather",
    icon: CloudSun,
    title: "আবহাওয়ার পূর্বাভাস",
    titleEn: "Weather Forecast",
    questions: [
      "আমার এলাকায় পরবর্তী ৭ দিনের আবহাওয়ার পূর্বাভাস কী?",
      "পরবর্তী ৪৮ ঘন্টায় বৃষ্টি হবে কি? আমি কি স্প্রে করা স্থগিত করব?",
      "এই সপ্তাহে প্রত্যাশিত তাপমাত্রার পরিসীমা কী?",
      "আমার অঞ্চলের জন্য কোনো চরম আবহাওয়া সতর্কতা আছে কি?",
      "আর্দ্রতার মাত্রা কী এবং এটি আমার ফসলকে কীভাবে প্রভাবিত করবে?"
    ]
  },
  {
    id: "market",
    icon: DollarSign,
    title: "বাজার মূল্য",
    titleEn: "Market Prices",
    questions: [
      "আজ ধানের বাজার মূল্য কত?",
      "আলুর সর্বোচ্চ দাম কোন বাজারে?",
      "সপ্তাহে সবজির মূল্য কেমন হবে?",
      "কখন আমার ফসল বিক্রি করলে বেশি লাভ হবে?",
      "আমার এলাকায় সবচেয়ে ভালো দাম কোথায়?"
    ]
  },
  {
    id: "crop",
    icon: Sprout,
    title: "ফসল পরামর্শ",
    titleEn: "Crop Advice",
    questions: [
      "এই মৌসুমে কোন ফসল চাষ করলে ভালো হবে?",
      "আমার জমিতে কি সার দিতে হবে?",
      "কখন বীজ বপন করা উচিত?",
      "ফসলের রোগ হলে কী করব?",
      "সেচ দেওয়ার সঠিক সময় কখন?"
    ]
  },
  {
    id: "pest",
    icon: Bug,
    title: "পোকা নিয়ন্ত্রণ",
    titleEn: "Pest Control",
    questions: [
      "আমার ফসলে কী ধরনের পোকা আক্রমণ করেছে?",
      "পোকা দমনের জন্য কোন ওষুধ ব্যবহার করব?",
      "জৈব উপায়ে কীভাবে পোকা নিয়ন্ত্রণ করব?",
      "কখন কীটনাশক স্প্রে করা উচিত?",
      "পোকা থেকে ফসল রক্ষার সেরা উপায় কী?"
    ]
  }
];

const VoiceAI = () => {
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"bn" | "en">("bn");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleMicClick = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate listening
      setTimeout(() => {
        setIsListening(false);
        setInputValue("আমার ধানের পাতা হলুদ হয়ে যাচ্ছে, কী করব?");
      }, 2000);
    }
  };

  const handleCardClick = (cardId: string) => {
    setSelectedCard(selectedCard === cardId ? null : cardId);
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
    setSelectedCard(null);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      // Handle send action
      console.log("Sending:", inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Custom Header */}
      <header className="bg-white border-b border-[#E5E7EB] shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#2ECC71] rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-[#2C3E50]">
                NobinKrishi
              </span>
            </Link>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedLang(selectedLang === "bn" ? "en" : "bn")}
                  className="border-[#E5E7EB] text-[#2C3E50] hover:bg-[#F9FAFB]"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {selectedLang === "bn" ? "বাংলা" : "English"}
                </Button>
              </div>

              {/* Connected Status */}
              <div className="flex items-center gap-2 text-[#2ECC71]">
                <Wifi className="w-4 h-4" />
                <span className="text-sm font-medium">{selectedLang === "bn" ? "সংযুক্ত" : "Connected"}</span>
              </div>

              {/* Feedback */}
              <Button
                variant="ghost"
                size="sm"
                className="text-[#2C3E50] hover:bg-[#F9FAFB]"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Feedback
              </Button>

              {/* Microphone Icon */}
              <button
                onClick={handleMicClick}
                className={`p-2 rounded-full transition-all ${
                  isListening
                    ? "bg-[#2ECC71] text-white animate-pulse"
                    : "text-[#2C3E50] hover:bg-[#F9FAFB]"
                }`}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-32">
        <div className="container mx-auto px-6 py-12">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-[#2C3E50] mb-2">
              🌾 NobinKrishi Voice Assistant
            </h1>
            <p className="text-lg text-[#2C3E50]/80">
              নবীন কৃষি ভয়েস সহায়ক
            </p>
            <p className="text-base text-[#2C3E50]/70 mt-2">
              আপনার কৃষি সহায়ক - কথা বলুন, জানুন, বাড়ান
            </p>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-5xl mx-auto">
            {actionCards.map((card) => {
              const Icon = card.icon;
              const isSelected = selectedCard === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`bg-white rounded-2xl p-6 flex flex-col items-center transition-all duration-300 ${
                    isSelected
                      ? "border-2 border-[#2ECC71] shadow-md scale-105"
                      : "border border-[#E5E7EB] hover:border-[#2ECC71] hover:scale-[1.02]"
                  }`}
                >
                  <Icon className="w-16 h-16 text-[#2ECC71] mb-4" />
                  <p className="text-base font-medium text-[#2C3E50] text-center font-sans">
                    {selectedLang === "bn" ? card.title : card.titleEn}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Popular Questions Section */}
          {selectedCard && (
            <div className="max-w-4xl mx-auto animate-fade-up">
              <Card className="bg-white shadow-md rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-display font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
                  🎯 {selectedLang === "bn" ? "জনপ্রিয় প্রশ্ন" : "Popular Questions"}
                </h2>
                <div className="space-y-3">
                  {actionCards
                    .find((c) => c.id === selectedCard)
                    ?.questions.map((question, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuestionClick(question)}
                        className="w-full text-left p-4 rounded-lg border border-[#E5E7EB] hover:bg-[#F0F9F7] hover:border-[#2ECC71] transition-all duration-300 flex items-center justify-between group"
                      >
                        <span className="text-base text-[#2C3E50] font-sans leading-relaxed flex-1">
                          {question}
                        </span>
                        <ChevronRight className="w-5 h-5 text-[#2ECC71] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Fixed Bottom Input Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] shadow-lg z-40">
        <div className="container mx-auto px-6 py-4">
          {/* Input Field */}
          <div className="flex items-center gap-3 mb-4">
            <Input
              type="text"
              placeholder={selectedLang === "bn" ? "আবহাওয়া, বাজার মূল্য বা চাষের পরামর্শ সম্পর্কে জিজ্ঞাসা করুন..." : "Ask about weather, market prices, or farming advice..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 h-12 text-base border-[#E5E7EB] rounded-xl focus:border-[#2ECC71] focus:ring-2 focus:ring-[#2ECC71]/20"
            />
            <Button
              onClick={handleSend}
              className="bg-[#2ECC71] hover:bg-[#27AE60] text-white h-12 px-4 rounded-xl"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>

          {/* Microphone Button with Dotted Lines */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 h-px border-t-2 border-dotted border-[#E5E7EB]"></div>
            <button
              onClick={handleMicClick}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening
                  ? "bg-[#E74C3C] animate-pulse scale-110"
                  : "bg-[#2ECC71] hover:bg-[#27AE60] hover:scale-105"
              }`}
            >
              {isListening ? (
                <MicOff className="w-7 h-7 text-white" />
              ) : (
                <Mic className="w-7 h-7 text-white" />
              )}
            </button>
            <div className="flex-1 h-px border-t-2 border-dotted border-[#E5E7EB]"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5E7EB] py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="text-[#2ECC71] hover:text-[#27AE60] font-medium flex items-center">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
          <p className="text-sm text-[#2C3E50]/60">
            © 2025 NobinKrishi
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VoiceAI;


import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("Hindi");
  const [lastCommand, setLastCommand] = useState("");

  const languages = ["Hindi", "English", "Marathi", "Telugu", "Tamil", "Kannada", "Bengali", "Gujarati"];

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setLastCommand("Listening...");
      setTimeout(() => {
        setLastCommand("Search for tomato plants");
        setIsListening(false);
      }, 3000);
    } else {
      setLastCommand("");
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === "Hindi" ? "hi-IN" : "en-IN";
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Main Voice Ball - Always Visible */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-16 h-16 rounded-full ${
            isListening 
              ? "bg-red-500 hover:bg-red-600 animate-pulse" 
              : "bg-green-600 hover:bg-green-700"
          } shadow-lg transition-all duration-300 ${
            isListening ? "ring-4 ring-red-200" : "ring-4 ring-green-200"
          }`}
        >
          {isListening ? (
            <MicOff className="h-8 w-8 text-white" />
          ) : (
            <Mic className="h-8 w-8 text-white" />
          )}
        </Button>
      </div>

      {/* Expanded Voice Panel */}
      {isExpanded && (
        <Card className="fixed bottom-24 right-6 w-80 z-50 shadow-xl border-2 border-green-200">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-green-800 flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Voice Assistant
                </h3>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {currentLanguage}
                </Badge>
              </div>

              {/* Voice Controls */}
              <div className="space-y-2">
                <Button
                  onClick={toggleListening}
                  className={`w-full ${
                    isListening 
                      ? "bg-red-500 hover:bg-red-600" 
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-4 w-4 mr-2" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" />
                      Start Voice Command
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => speakText("Welcome to NurseryConnect. How can I help you today?")}
                  className="w-full"
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Test Speech
                </Button>
              </div>

              {/* Last Command */}
              {lastCommand && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Last Command:</strong> {lastCommand}
                  </p>
                </div>
              )}

              {/* Language Selector */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Language:</p>
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Commands */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Try saying:</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>• "Search for tomato plants"</p>
                  <p>• "Open my dashboard"</p>
                  <p>• "Show marketplace"</p>
                  <p>• "Read this page"</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default VoiceAssistant;

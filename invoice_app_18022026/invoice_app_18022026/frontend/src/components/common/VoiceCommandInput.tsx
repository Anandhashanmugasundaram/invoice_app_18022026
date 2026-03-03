import React, { useState, useMemo } from 'react';
import { Mic, Square, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';
import { transcribeApi } from '../../api/transcribeApi';

interface VoiceCommandInputProps {
  onTranscriptionComplete: (text: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const VoiceCommandInput: React.FC<VoiceCommandInputProps> = ({
  onTranscriptionComplete,
  isLoading = false,
  placeholder = 'Speak your command...',
}) => {
  const { isRecording, isSupported, error: recorderError, startRecording, stopRecording, clearError } = useVoiceRecorder();
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [transcribeError, setTranscribeError] = useState<string | null>(null);

  const barHeights = useMemo(() => 
    Array.from({ length: 8 }, () => Math.random() * 16 + 4), []
  );

  const handleStartRecording = async () => {
    clearError();
    setSuccessMessage(null);
    setTranscribeError(null);
    await startRecording();
  };

  const handleStopRecording = async () => {
    const audioBlob = await stopRecording();
    if (!audioBlob) return;

    setIsTranscribing(true);
    setTranscribeError(null);
    try {
      const transcribedText = await transcribeApi.transcribeAudio(audioBlob);
      
      if (transcribedText && transcribedText.length > 0) {
        const truncatedText = transcribedText.substring(0, 500);
        onTranscriptionComplete(truncatedText);
        setSuccessMessage(`Transcribed: "${truncatedText}"`);
        
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to transcribe audio';
      setTranscribeError(errorMessage);
    } finally {
      setIsTranscribing(false);
    }
  };

  const displayError = recorderError || transcribeError;

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <AlertCircle className="w-5 h-5 text-yellow-600" />
        <span className="text-sm text-yellow-800">Voice recording not supported in your browser</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          disabled={isLoading || isTranscribing}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isTranscribing ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : isRecording ? (
            <>
              <Square className="w-4 h-4" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              Start Recording
            </>
          )}
        </button>

        {isRecording && (
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {barHeights.map((height, i) => (
                <div
                  key={i}
                  className="w-1 bg-red-500 rounded-full animate-pulse"
                  style={{
                    height: `${height}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">Recording...</span>
          </div>
        )}
      </div>

      {displayError && (
        <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span className="text-sm text-red-700">{displayError}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className="text-sm text-green-700 truncate">{successMessage}</span>
        </div>
      )}

      <p className="text-xs text-gray-500">{placeholder}</p>
    </div>
  );
};

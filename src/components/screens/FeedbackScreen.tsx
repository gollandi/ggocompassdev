'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { GGOButton } from "../ggo/GGOButton";
import { FooterDisclaimer } from "../ggo/FooterDisclaimer";
import { Slider } from "../ui/slider";
import { Heart } from "lucide-react";

interface FeedbackScreenProps {
  onNext: (rating: number, comments: string) => void;
}

const feedbackLabels = [
  "Not supported",
  "Somewhat supported",
  "Supported",
  "Very supported",
  "Completely supported",
];

export function FeedbackScreen({ onNext }: FeedbackScreenProps) {
  const [rating, setRating] = useState(3);
  const [comments, setComments] = useState("");

  const handleSubmit = () => {
    onNext(rating, comments);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 md:px-24 py-12">
        <motion.div
          className="max-w-2xl w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-16 h-16 text-ggo-teal mx-auto" />
          </motion.div>
          <h1 className="mb-4 text-ggo-navy">How did we do?</h1>
          <p className="text-ggo-text-muted">
            Your feedback helps us improve the journey for everyone.
          </p>
        </div>

        {/* Feedback Card */}
        <motion.div
          className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Rating Slider */}
          <div className="mb-8">
            <label className="block mb-6 text-ggo-navy text-center">
              I felt supported throughout my journey
            </label>
            
            <div className="px-2">
              <Slider
                value={[rating]}
                onValueChange={(value: number[]) => setRating(value[0])}
                min={1}
                max={5}
                step={1}
                className="mb-4"
              />
              
              <motion.div
                key={rating}
                className="text-center py-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-block px-6 py-3 bg-ggo-teal/10 rounded-xl">
                  <p className="text-ggo-teal">
                    {feedbackLabels[rating - 1]}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Visual Rating Dots */}
            <div className="flex justify-between px-2 mb-8">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className={`
                    w-4 h-4 rounded-full transition-all duration-300
                    ${rating >= value 
                      ? 'bg-ggo-teal scale-110' 
                      : 'bg-ggo-navy/20 hover:bg-ggo-navy/40'
                    }
                  `}
                />
              ))}
            </div>
          </div>

          {/* Comments - Only show if rating > 3 per Board feedback */}
          {rating > 3 && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <label className="block mb-3 text-ggo-navy">
                Tell us more (optional)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="What went well? What could we improve?"
                rows={5}
                className="w-full px-4 py-4 bg-ggo-light rounded-xl border-2 border-transparent focus:border-ggo-teal focus:outline-none transition-colors resize-none font-medium"
              />
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <GGOButton 
              variant="primary" 
              onClick={handleSubmit}
              className="min-h-[48px]"
            >
              Submit Feedback
            </GGOButton>
          </div>
        </motion.div>

        {/* Reassurance Note */}
        <motion.p
          className="text-center mt-8 text-ggo-text-muted font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your responses are anonymous and help us serve you better.
        </motion.p>
        </motion.div>
      </div>
      
      <FooterDisclaimer />
    </div>
  );
}

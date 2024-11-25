import React, { useEffect, useState } from "react";

// Interface for Presale Stage
interface PresaleStage {
  stage: string;
  date: string;
  tokenPrice: string;
  bonus: string;
}

// Interface for Testimonial
interface Testimonial {
  name: string;
  feedback: string;
}

const PresaleStage: React.FC = () => {
  const presaleStages: PresaleStage[] = [
    {
      stage: "Stage 1",
      date: "June 1 - June 7, 2024",
      tokenPrice: "0.01 ETH",
      bonus: "20% Bonus",
    },
    {
      stage: "Stage 2",
      date: "June 8 - June 14, 2024",
      tokenPrice: "0.012 ETH",
      bonus: "15% Bonus",
    },
    {
      stage: "Stage 3",
      date: "June 15 - June 21, 2024",
      tokenPrice: "0.015 ETH",
      bonus: "10% Bonus",
    },
  ];

  const testimonials: Testimonial[] = [
    { name: "John Doe", feedback: "Highly recommended for early investors!" },
    {
      name: "Jane Smith",
      feedback: "The transparency and security measures were excellent.",
    },
  ];

  const [progress, setProgress] = useState<number>(65);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const targetDate = new Date("June 1, 2024 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("Presale Started");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    // <section className="bg-gradient-to-r to-blue-100 py-16">
    <section className="text-white py-16 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">Presale</h2>
        <p className="text-lg text-gray-600 mt-2">
          Secure Your HTCN Tokens Early
        </p>
      </div>

      {/* Countdown Timer & Progress Bar */}
      <div className="max-w-3xl mx-auto mb-10 px-4 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Time Left for Presale Start
        </h3>
        <div className="text-3xl font-bold text-blue-500">{timeLeft}</div>
        <div className="bg-gray-200 rounded-full h-4 w-full mt-6">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-600 mt-2">{progress}% of tokens sold</p>
      </div>

      {/* Presale Stages */}
      <div className="max-w-5xl mx-auto px-4 mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {presaleStages.map((stage, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {stage.stage}
            </h3>
            <p className="text-gray-600 mt-2">
              <strong>Date:</strong> {stage.date}
            </p>
            <p className="text-gray-600">
              <strong>Price:</strong> {stage.tokenPrice}
            </p>
            <p className="text-gray-600">
              <strong>Bonus:</strong> {stage.bonus}
            </p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="max-w-5xl mx-auto px-4 mb-10 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Community Feedback
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
              <h4 className="text-lg font-semibold text-gray-800 mt-4">
                - {testimonial.name}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <a
          href="/presale"
          className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transition duration-300"
        >
          Participate Now
        </a>
      </div>
    </section>
  );
};

export default PresaleStage;

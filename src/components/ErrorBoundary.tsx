"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Game error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 p-8">
            <span className="text-6xl">😢</span>
            <h2 className="text-2xl font-bold text-white">حدث خطأ!</h2>
            <p className="text-white/80 text-center">لا تقلق، اضغط الزر لإعادة المحاولة</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="bg-white/90 hover:bg-white text-gray-700 font-bold px-8 py-3 
                         rounded-full text-xl shadow-lg transition-all hover:scale-105"
            >
              🔄 حاول مرة أخرى
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

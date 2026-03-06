import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Compass } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mx-4 shadow-lg border-border bg-card">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full animate-pulse scale-150" />
              <Compass className="relative h-20 w-20 text-accent" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-foreground mb-4">404</h1>

          <h2 className="text-2xl font-semibold text-foreground mb-6">
            迷路也是一種抵達
          </h2>

          <p className="text-muted-foreground mb-10 leading-relaxed text-lg">
            看來這個頁面暫時不在地圖上，
            <br />
            讓我們回到起點，重新出發吧。
          </p>

          <div className="flex justify-center">
            <Button
              onClick={handleGoHome}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 rounded-xl transition-all duration-200 shadow-md text-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              回到首頁
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

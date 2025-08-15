import Image from "next/image";
import PageContainer from "@/components/layout/PageContainer";
import ContentCard from "@/components/layout/ContentCard";

export default function Home() {
  return (
    <PageContainer>
      <div className="relative">
        {/* Logo positioned above the card */}
        <div className="relative z-10 flex justify-center mb-[-50px]">
          <Image
            src="/images/logo.png"
            alt="The Heart Therapy Logo"
            width={160}
            height={160}
            className="drop-shadow-lg"
            priority
          />
        </div>
        
        <ContentCard className="pt-16 pb-12 px-12">
          {/* Header section with "home" and border */}
          <div 
            className="absolute top-0 left-0 right-0 px-6 py-3 rounded-t-3xl border-b border-foreground"
            style={{
              background: 'linear-gradient(to bottom, #D9D9D9, #B7B7B7)'
            }}
          >
            <span className="text-foreground font-medium">home</span>
          </div>
          
          <div className="text-center mt-4">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              hi! <span className="text-primary">i'm hanyu</span>
            </h1>
            
            <p className="text-lg text-secondary mb-8">
              professional counsellor of 3 years (Master of Counselling)
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <Image
                  src="/images/icons/about.png"
                  alt="About"
                  width={64}
                  height={64}
                  className="mx-auto mb-2"
                />
                <span className="text-foreground font-medium">About</span>
              </div>
              
              <div className="text-center">
                <Image
                  src="/images/icons/faq.png"
                  alt="FAQ"
                  width={64}
                  height={64}
                  className="mx-auto mb-2"
                />
                <span className="text-foreground font-medium">FAQ</span>
              </div>
              
              <div className="text-center">
                <Image
                  src="/images/icons/fees.png"
                  alt="Fees"
                  width={64}
                  height={64}
                  className="mx-auto mb-2"
                />
                <span className="text-foreground font-medium">Fees</span>
              </div>
              
              <div className="text-center">
                <Image
                  src="/images/icons/contact.png"
                  alt="Contact"
                  width={64}
                  height={64}
                  className="mx-auto mb-2"
                />
                <span className="text-foreground font-medium">Contact</span>
              </div>
            </div>
          </div>
        </ContentCard>
      </div>
      
      {/* Testimonial cat in bottom right */}
      <div className="fixed bottom-8 right-8">
        <div className="relative">
          <Image
            src="/images/testimonial.png"
            alt="Testimonial Cat"
            width={120}
            height={120}
            className="drop-shadow-lg"
          />
          <div className="absolute -top-4 -left-8 bg-white rounded-lg p-3 shadow-lg border border-border/20 max-w-xs">
            <p className="text-sm text-foreground">
              "Thank you for your patience & guidance all this while"
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

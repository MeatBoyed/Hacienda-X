import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
    {
      question: "How can I get started with your platform?",
      answer:
        "Getting started is easy! Simply sign up for a free trial on our website. Our onboarding team will guide you through the setup process and help you make the most of our platform.",
    },
    {
      question: "Is there a limit to the number of users I can add?",
      answer:
        "We offer flexible plans to accommodate teams of all sizes. Our basic plan starts with a limited number of users, but we have options to scale up as your team grows. Contact our sales team for more information on enterprise-level solutions.",
    },
    {
      question: "Can I integrate your platform with other tools we use?",
      answer:
        "Yes, we offer a wide range of integrations with popular tools and services. Our API also allows for custom integrations if you need something specific. Check our documentation or speak with our support team for more details.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We pride ourselves on our comprehensive support. This includes 24/7 live chat support, an extensive knowledge base, video tutorials, and for our enterprise customers, dedicated account managers. We're here to ensure your success with our platform.",
    },
  ];

export default function FaqSection() {
    return (
      <div className="">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </Accordion>
      </div>
    )
}

function FaqItem({ question, answer, index }: { question: string, answer: string, index: number }) {
    return (
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
    )
}
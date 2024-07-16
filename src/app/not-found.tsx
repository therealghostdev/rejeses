import Button from "@/components/reusables/button";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-8 w-full min-h-screen justify-center items-center">
      <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold font-bricolage_grotesque">
        404 Not Found :(
      </h2>
      <p className="text-2xl">Could not find requested resource</p>

      <Button
        text="Return Home"
        transition_class="transition_button4"
        url="/"
        bg="#89C13E"
      />
    </div>
  );
}

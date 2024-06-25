import CreateRoomCard from "@/components/dashboard/createRoomCard";
import JoinRoomCard from "@/components/dashboard/joinRoomCard";

const page = () => {
  return (
    <div className="flex-1 space-y-4 p-6 pt-6">
      <div className="flex justify-start gap-4">
        <CreateRoomCard />
        <JoinRoomCard />
      </div>
    </div>
  );
};

export default page;

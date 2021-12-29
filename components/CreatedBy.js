function CreatedBy({ userId, usersData }) {
  let user = usersData.find((o) => (o.id = userId));
  console.log(user);
  return (
    <a href="#" class="flex flex-row relative items-center">
      <img
        alt="profil"
        src={user.profileImageUrl}
        class="object-cover rounded-full h-6 w-6 mr-2"
      />
      <p>{user.firstName + " " + user.lastName}</p>
    </a>
  );
}
export default CreatedBy;

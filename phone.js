const loadAllPhones = async (showAll, searchText) => {
  document.getElementById("spinner").classList.add("hidden");

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      searchText ? searchText : "iphone"
    }`
  );
  const data = await res.json();

  if (showAll) {
    displayAllPhones(data.data);
  } else {
    displayAllPhones(data.data.slice(0, 8));
  }
};

const handleSearch = () => {
  document.getElementById("spinner").classList.remove("hidden");
  const searchText = document.getElementById("search-text").value;

  setTimeout(() => {
    loadAllPhones(false, searchText);
  }, 2000);
};

const displayAllPhones = (phones) => {
  const phoneContainer = document.getElementById("phones-container");

  phoneContainer.innerHTML = "";

  phones.forEach((phone) => {
    const { image, brand, slug, phone_name } = phone;

    // create element
    const div = document.createElement("div");
    div.classList = "card card-compact bg-base-100 w-96 shadow-xl";
    div.innerHTML = `
      <figure>
        <img
        src=${image}
        alt="Image" />
      </figure>
      <div class="card-body flex flex-col items-center">
        <h2 class="card-title">${brand}</h2>
        <p>${phone_name}</p>
        <div class="card-actions justify-end">
            <button onclick="showModal('${slug}')" class="btn btn-primary">View Details</button>
        </div>
      </div>
    `;

    phoneContainer.appendChild(div);
  });
};

const handleShowAll = () => {
  loadAllPhones(true);
};

const showModal = async (slugs) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slugs}`
  );
  const data = await res.json();
  console.log(data.data);

  const {
    brand,
    name,
    mainFeatures: { storage, displaySize, memory },
  } = data.data;

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
    <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
          <h3 class="text-2xl font-bold">Brand: ${brand}</h3>
          <h3 class="text-lg font-bold">Name: ${name}</h3>
          <p class="py-1">Storage: ${storage}.</p> 
          <p class="py-1">DisplaySize: ${displaySize}.</p> 
          <p class="py-1">Memory: ${memory}.</p> 
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
  `;

  my_modal_1.showModal();
};

loadAllPhones(false);

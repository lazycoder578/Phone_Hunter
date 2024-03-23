const loadPhone = async (searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    //clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    //display show all button
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    //display pnly first 10 phone
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone =>{
        console.log(phone);
        //2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-black-400 p-4 shadow-xl`;
        //3 set innerHTML
        phoneCard.innerHTML = `
        <figure>
        <img
          src="${phone.image}" alt="phone"/>
        </figure>
        <div class="card-body">
        <h2 class="card-title justify-center">${phone.phone_name}</h2>
        <p class="text-center">There are many variations of passanger of <br/> available, but the majority have suffered</p>
        <h2 class="font-bold  text-center">$ 999</h2>
        <div class="card-actions justify-center">
          <button onClick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `;
        //4 append child
        phoneContainer.appendChild(phoneCard);
    });
    //hide loading spinner
    toggleLoadingSpinner(false);
}
//Show Details
const handleShowDetails = async(id)=>{
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
    const phoneName = document.getElementById("show-detaol-phone-name");
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p><span>Storage: </span>${phone.mainFeatures?.storage}</p>
        <p><span>Display: </span>${phone.mainFeatures?.displaySize}</p>
        <p><span>ChipSet: </span>${phone.mainFeatures?.chipSet}</p>
        <p><span>Memory: </span>${phone.mainFeatures?.memory}</p>
        <p><span>Slug: </span>${phone.slug}</p>
        <p><span>Release Date: </span>${phone.releaseDate}</p>
        <p><span>Brand: </span>${phone.brand}</p>
        <p><span>GPS: </span>${phone.others?.GPS}</p>
    `;
    //show the modal
    show_details_modal.showModal();
}

//handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

// loading spinner
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

//handle show All
const handleShowAll = () =>{
    handleSearch(true);
}


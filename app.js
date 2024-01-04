const loadServices = () => {
  fetch("https://testing-8az5.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => DisplayServiec(data))
    .catch((err) => console.log(err));
};

const DisplayServiec = (services) => {
  services.forEach((service) => {
    const parent = document.getElementById("service-container");
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="card shadow h-100">
            <div class="ratio ratio-16x9">
                <img src=${
                  service.image
                } class="card-img-top" loading="lazy" alt="...">
                            </div>
                            <div class="card-body p-xl-5">
                                <h3 class="card-title h5">${service.name}</h3>
                                <p class="card-text">${service.description.slice(
                                  0,
                                  100
                                )}</p>
                                <a href="#" class="btn btn-primary">Details</a>
                            </div>
                        </div>
    `;
    parent.appendChild(li);
  });
};

const loadDoctors = (search) => {
  document.getElementById("doctor-container").innerHTML = "";

  fetch(
    `https://testing-8az5.onrender.com/doctor/list/?search=${
      search ? search : ""
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length > 0) {
        displayDoctors(data?.results);
        document.getElementById("nodata").style.display = "none";
      } else {
        document.getElementById("doctor-container").innerHTML = "";
        document.getElementById("nodata").style.display = "block";
      }
    });
};

const displayDoctors = (doctors) => {
  doctors?.forEach((doctor) => {
    const parent = document.getElementById("doctor-container");
    const div = document.createElement("div");
    div.innerHTML = `
    <img style=" border-radius:50px ; width:100px; height:100px;"  src=${
      doctor?.image
    } class="card-img-top m-auto" alt="...">
    <div class="card-body">
        <h5 class="card-title">${doctor?.full_name}</h5>
        <button class="btn btn-success mt-2">${doctor?.designation}</button>
        ${doctor.specialization?.map((items) => {
          return `<span>${items}</span>`;
        })}
        <button class="btn btn-primary active" > <a target="_blank" class="text-decoration-none text-light " href="docDetail.html?doctorId=${
          doctor.id
        }">Details</a> </button>
    `;
    parent.appendChild(div);
  });
};

const loadDesinantion = () => {
  fetch("https://testing-8az5.onrender.com/doctor/designation/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((items) => {
        const parent = document.getElementById("drop-dog");
        const li = document.createElement("li");
        li.classList.add("dropdown-items");
        li.innerHTML = `
      <li onclick="loadDoctors('${items.name}')">${items.name}</li>
      `;
        parent.appendChild(li);
      });
    });
};

const loadSpcealization = () => {
  fetch("https://testing-8az5.onrender.com/doctor/specialization/")
    .then((res) => res.json())
    .then((data) => {
      data?.forEach((items) => {
        const parent = document.getElementById("drow-sp");
        const li = document.createElement("li");
        li.classList.add("drowdown-items");
        li.innerHTML = `
      <li onclick="loadDoctors('${items.name}')">${items.name}</li>
      `;
        parent.appendChild(li);
      });
    });
};

const hendleSecrch = () => {
  const value = document.getElementById("search").value;
  loadDoctors(value);
};

const loadReview = () => {
  fetch("https://testing-8az5.onrender.com/doctor/review/")
    .then((res) => res.json())
    .then((data) => DisplayReview(data));
};

const DisplayReview = (reviews) => {
  reviews?.forEach((review) => {
    const parent = document.getElementById("review-container");
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="card shadow h-100">
      <div class="ratio ratio-16x9">
        <img src="./images/logo.png" class="card-img-top" loading="lazy" alt="...">
           </div>
               <div class="card-body p-xl-5">
                    <h3 class="card-title h5">${review.reviewer}</h3>
                     <p>${review.doctor}</p>
                     <p>${review.body.slice(0, 100)}</p> 
                     <p>${review.created_on}</p> 
                      <p>${review.rating}</p> 
                                
                                
        </div>
      </div>
    `;
    parent.appendChild(li);
  });
};

loadServices();
loadDoctors();
loadDesinantion();
loadSpcealization();
loadReview();

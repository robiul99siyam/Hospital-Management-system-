const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("doctorId");
  loadTime(param);
  fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
    .then((res) => res.json())
    .then((data) => DisplayDetails(data));

  fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${param}`)
    .then((res) => res.json())
    .then((data) => doctorReview(data));
};
const DisplayDetails = (doctors) => {
  const parent = document.getElementById("details-doc");
  const div = document.createElement("div");
  div.innerHTML = `
  
  <div class="card mb-3 m-auto" style="max-width: 80%;">
            <div class="row g-0">
              <div class="col-md-4">
                <img class="w-100 p-2 rounded-2 h-100" src=${doctors?.image} class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${doctors?.full_name}</h5>
                  <h5 class="card-title">${doctors?.designation}</h5>
                  <h5 class="card-title">${doctors?.specialization}</h5>
                  <h5 class="card-title">Fee: ${doctors?.fee}</h5>
                  <h5 class="card-title">meet link: ${doctors?.meet_link}</h5>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  take appoinment 
                  </button>
                </div>
              </div>
            </div>
          </div>
  `;
  parent.appendChild(div);
};

const doctorReview = (reviews) => {
  reviews?.forEach((review) => {
    const parent = document.getElementById("doctor-review");
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

const loadTime = (id) => {
  fetch(
    `https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${id}`
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((time) => {
        const parent = document.getElementById("timeLoad");
        const option = document.createElement("option");
        option.value = time.id;
        option.innerText = time.name;
        parent.appendChild(option);
      });
    });
};

const appoinment = () => {
  const status = document.getElementsByName("status");
  const selected = Array.from(status).find((button) => button.checked);
  const symptom = document.getElementById("systom").value;
  const time = document.getElementById("timeLoad");
  const selectedTime = time.options[time.selectedIndex];

  const info = {
    appointment_type: selected.value,
    appointment_status: "Pending",
    time: selectedTime.value,
    symptom: symptom,
    cancel: false,
    patient: 1,
    doctor: 1,
  };
  fetch("https://testing-8az5.onrender.com/appointment/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      
      
      console.log(data);
    });

};
getparams();
loadTime();
appoinment();

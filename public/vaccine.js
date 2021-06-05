const openInNewWindow = function(url){
	window.open(url);
}
const getVaccineData = async function (){
	let pincode = document.getElementById("pinCode").value;
	let date = document.getElementById("visitDate").value.split('-');
	date_str = (date[2]+'-'+date[1]+'-'+date[0]).toString();
	// console.log(date_str);
	let res = await fetch(`http://localhost:8000/details?pincode=${pincode}&date=${date_str}`);
	// console.log(res);
	let vaccineData = await res.json();
	// console.log(vaccineData);
	showVaccineData(vaccineData,date_str);
}


const showVaccineData = function(raw_data,date_str){
	// console.log(raw_data);
	let output_html = document.createElement("div");
	let output = document.getElementById("output_area");
	var output_table = document.getElementById("table_body");
	output.innerText = 'List of Centers';
	output_table.innerText = '';
	// output.innerText = JSON.stringify(data);
	try
	{
		data = raw_data.sessions;
		// console.log(data.length);
		if(data.length===0){
			output.innerText = `SORRY !! Data not available for ${date_str} yet !! Try another date within 2-3 days of today\'s date`;
			output.classList.add("text-danger");
		}
		else{
			// console.log('data',data);
			let temp_str = '';
			data.forEach((d)=>{
					temp_str += '<tr>'
					temp_str += '<td>'+ '<span class="badge bg-success">'+ d.date + '</span>' + '</td>';
					temp_str += '<td>'+ d.name + '</td>';
					temp_str += '<td>'+ d.address + '</td>';
					temp_str += '<td>'+ d.block_name + '</td>';
					temp_str += '<td>'+ d.district_name + '</td>';
					if(d.fee_type=='Free'){
						temp_str += '<td class="text-success">'+ d.fee_type + '</td>';
					}
					else{
						temp_str += '<td class="text-danger">'+ d.fee_type + '</td>';
					}
					temp_str += '<td>'+ d.fee + '</td>';
					temp_str += '<td>'+ d.available_capacity_dose1+ '</td>';
					temp_str += '<td>'+ d.available_capacity_dose2+ '</td>';
					temp_str += '<td>'+ d.available_capacity+ '</td>';
					temp_str += '<td>'+ d.min_age_limit+ '</td>';
					temp_str += '<td>'+ d.vaccine+ '</td>';
					let a_slots = '';
					d.slots.forEach((s)=>{
						a_slots += '<span class="badge bg-secondary">'+ s + '</span>'
						}
					);
					g = d.slots;
					// console.log(a_slots);
					temp_str += '<td>'+ a_slots+ '</td>';
					temp_str += '</tr>';
				}
			);
			output_table.innerHTML = temp_str ;
		}
	}catch(err)
	{
		output.innerText = raw_data["error"];
		output.classList.add("text-danger");
	}

	output.appendChild(output_html);

}
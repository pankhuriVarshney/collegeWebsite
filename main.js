const attendance={'Communication Skills':80,'Mathematics  II': 85, "Programming in C":75, "Environmental Science":70};
 
//doughnut graph
const dg = document.querySelector(".dgraph");
const ul = document.querySelector(".doughnutgraph .details ul");
const chartData={
    labels: ["Above 85%", "Between 85%-75%", "Below 75%"],
    subjects: [{},{},{}],
    data: [0, 0, 0]
};
var totalSub=0;
for(subject in attendance){
    if(attendance[subject]>=85) {chartData['data'][0]++; chartData['subjects'][0][subject]=attendance[subject];}
    else if (attendance[subject]>=75) {chartData['data'][1]++; chartData['subjects'][1][subject]=attendance[subject];}
    else {chartData['data'][2]++; chartData['subjects'][2][subject]=attendance[subject];}
    totalSub++;
}
for (let i=0;i<3;i++){
    chartData['data'][i]=(chartData['data'][i]/totalSub)*100;
}
console.log(chartData);


new Chart(dg, {
    type: "doughnut", 
    data: {
        labels:chartData.labels,
        datasets: [
            {
                // label: chartData.subjects.join(", \n"), // Subjects with attendance above 85%
                label: {
                    formatter: function(value, context) {
                        let label = chartData.labels[context.dataIndex];
                        let percentage = value + "%";
                        let subjects = chartData.subjects[context.dataIndex].map(subject => `${subject.name} (${subject.attendance}%)`).join(", ");
                        return `${label}: ${percentage} (${subjects})`;
                    }
                },
                data: chartData.data,
                backgroundColor: ['rgb(47, 155, 40)','rgb(228, 168, 26)', 'rgb(226, 40, 40)'],
                borderColor: ['rgb(255,255,255)','rgb(255,255,255)','rgb(255,255,255)'],
                hoverOffset: 4,
                
            }
        ]
    }, 
    options: {
        borderWidth: 10,
        //borderColor: rgba(204, 181, 154, 0),
        borderRadius: 7,
        hoverBorderWidth: 0,
        plugins: {
            legend: {
                display: false,
            }
        },
        events: ['click']
    }
});

const displayDetails = () => {
    chartData.labels.forEach((l, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${l} : <span class='percentage ${l}'>${chartData.data[i]}%</span>`;
        ul.appendChild(li);
    });
    };

displayDetails();
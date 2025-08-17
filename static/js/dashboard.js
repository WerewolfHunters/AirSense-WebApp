// Initialize Chart.js
        document.addEventListener('DOMContentLoaded', function() {
            // Lung Health Chart
            const ctx = document.getElementById('healthChart').getContext('2d');

            const gradientBlue = ctx.createLinearGradient(0, 0, 0, 400);
            gradientBlue.addColorStop(0, 'rgba(79, 139, 255, 0.4)');
            gradientBlue.addColorStop(1, 'rgba(79, 139, 255, 0.05)');

            const gradientGreen = ctx.createLinearGradient(0, 0, 0, 400);
            gradientGreen.addColorStop(0, 'rgba(0, 201, 183, 0.4)');
            gradientGreen.addColorStop(1, 'rgba(0, 201, 183, 0.05)');

            const healthChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Lung Capacity (%)',
                        data: [78, 82, 85, 87, 90, 92],
                        borderColor: '#4F8BFF',
                        backgroundColor: gradientBlue,
                        borderWidth: 3,
                        pointBackgroundColor: '#4F8BFF',
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        pointHoverBorderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Breathing Rate (bpm)',
                        data: [18, 17, 16, 16, 15, 15],
                        borderColor: '#00C9B7',
                        backgroundColor: gradientGreen,
                        borderWidth: 3,
                        pointBackgroundColor: '#00C9B7',
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        pointHoverBorderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    family: 'Inter',
                                    weight: '600'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: '#1e293b',
                            titleColor: '#fff',
                            bodyColor: '#e2e8f0',
                            padding: 12,
                            cornerRadius: 8,
                            callbacks: {
                                label: function(context) {
                                    if (context.dataset.label === 'Lung Capacity (%)') {
                                        return `${context.formattedValue}% capacity`;
                                    } else {
                                        return `${context.formattedValue} breaths/min`;
                                    }
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            min: 10,
                            max: 100,
                            grid: {
                                color: 'rgba(0,0,0,0.05)',
                                borderDash: [5, 5]
                            },
                            ticks: {
                                stepSize: 10
                            }
                        }
                    },
                    animations: {
                        tension: {
                            duration: 1000,
                            easing: 'easeOutQuad',
                            from: 0.3,
                            to: 0.5,
                            loop: false
                        }
                    }
                }
            });
            
            // Animate progress rings
            function animateProgress() {
                const progressCircles = document.querySelectorAll('.progress-ring__circle');
                progressCircles.forEach(circle => {
                    const radius = circle.r.baseVal.value;
                    const circumference = 2 * Math.PI * radius;
                    const percent = parseFloat(circle.getAttribute('data-percent')) || 70;
                    const offset = circumference - (percent / 100) * circumference;
                    
                    circle.style.strokeDasharray = `${circumference} ${circumference}`;
                    circle.style.strokeDashoffset = circumference;
                    
                    setTimeout(() => {
                        circle.style.strokeDashoffset = offset;
                    }, 300);
                });
            }
            
            // Call animation
            animateProgress();
            
            // Simulate chat message sending
            const chatInput = document.querySelector('input[type="text"]');
            const chatMessages = document.querySelector('.overflow-y-auto');
            
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const message = document.createElement('div');
                    message.className = 'chat-message mb-3';
                    message.innerHTML = `
                        <div class="bg-primary text-white rounded-2xl rounded-br-none p-4">
                            <p class="text-sm">${this.value}</p>
                        </div>
                        <p class="text-xs text-textSecondary mt-1 text-right">Just now</p>
                    `;
                    chatMessages.appendChild(message);
                    this.value = '';
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            });
        });
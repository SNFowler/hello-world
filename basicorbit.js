class BasicOrbitSimulation{
    // Constructor
    constructor(state, sun_mass, grav_constant) {
        if (state.length !== 4){
            throw new Error('State vector of innapropriate size')
        }
        this.state = state;
        this.grav_constant = grav_constant;
        this.sun_mass = sun_mass;
        this.time = 0;
    }

    update(d_time) {
        const new_state = [0,0,0,0];
        
        // New x and y
        new_state[0] = this.state[0] + d_time*this.state[2];
        new_state[1] = this.state[1] + d_time*this.state[3];

        // Find the magnitude and direction of acceleration
        // find r^2
        const r_squared = this.state[0]*this.state[0] + this.state[1]*this.state[1];

        // Avoid division by zero errors. (This method of simulation will not be accurate for very near passes anyway)
        if (r_squared === 0) {
            throw new Error('Division by zero: position vector magnitude is zero');
        }
        const r = Math.sqrt(r_squared);

        // find the unit vector pointing from the object to the point 0,0
        const  unit_direction_grav = [-(this.state[0]/r),-(this.state[1]/r)];

        // magnitude of acceleration given by 
        const mag_acceleration = this.sun_mass*this.grav_constant*(1/r_squared);
        console.log("  a: ", mag_acceleration);
        console.log("r^2: ", r_squared)

        new_state[2] = this.state[2] + d_time*mag_acceleration*unit_direction_grav[0];
        new_state[3] = this.state[3] + d_time*mag_acceleration*unit_direction_grav[1];
        
        // update state
        this.state = new_state;
    }
}

function updateBallPosition(simulation) {
    const ball = document.getElementById('ball');
    const display = document.getElementById('display');

    const x = simulation.state[0] + display.offsetWidth / 2;
    const y = display.offsetHeight / 2 - simulation.state[1];

     // Update the position of the ball
    ball.style.left = `${x - (ball.offsetWidth / 2)}px`;
    ball.style.top = `${y - (ball.offsetHeight / 2)}px`;
}

function animate() {
    console.log(simulation.state);
    simulation.update(0.1);  // Update with a time step
    
    updateBallPosition(simulation);
    requestAnimationFrame(animate);  // Continue animation
}

const initialState = [-150, 0, 0, 8];  // Example state [x, y, vx, vy]
const simulation = new BasicOrbitSimulation(initialState, 1000, 10);

animate();
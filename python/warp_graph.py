import numpy as np
import plotly.graph_objects as go

def findRadius(x, y):
    return np.sqrt(x**2 + y**2)

def shapeFunction(r, sigma, R):
    numerator = np.tanh(sigma*(r + R)) - np.tanh(sigma*(r - R))
    denominator = 2*np.tanh(sigma*R)
    return numerator/denominator

def generateFrame(sigma, R, range_limit):
    x_values = np.linspace(-range_limit, range_limit, 100)
    y_values = np.linspace(-range_limit, range_limit, 100)
    X, Y = np.meshgrid(x_values, y_values)
    map_values = shapeFunction(findRadius(X, Y), sigma, R)

    return go.Heatmap(
        z=map_values,
        x=x_values,
        y=y_values,
        colorscale='Inferno',
        colorbar=dict(title='Value')
    )

axis_range = 5
sigma_range = np.linspace(0.5, 5, 10)
R_range = np.linspace(0.5, 3, 8)

frames = []

# Create frames for every (sigma, R) combination
for sigma in sigma_range:
    for R in R_range:
        frame_name = f"sigma_{sigma:.2f}_R_{R:.2f}"
        frames.append(
            go.Frame(
                data=[generateFrame(sigma, R, axis_range)],
                name=frame_name
            )
        )

# Initial figure
initial_sigma = sigma_range[0]
initial_R = R_range[0]

fig = go.Figure(
    data=[generateFrame(initial_sigma, initial_R, axis_range)],
    frames=frames
)

# Sigma slider
sigma_slider = {
    "active": 0,
    "currentvalue": {"prefix": "Sigma: "},
    "pad": {"t": 50},
    "steps": [
        {
            "label": "",
            "method": "animate",
            "args": [
                [f"sigma_{sigma:.2f}_R_{initial_R:.2f}"],
                {"frame": {"duration": 0, "redraw": True},
                 "mode": "immediate"}
            ],
        }
        for sigma in sigma_range
    ],
    "font": {"size": 20, "family": "Arial", "color": "black"},
}

# R slider
R_slider = {
    "active": 0,
    "currentvalue": {"prefix": "R: "},
    "pad": {"t": 120},
    "steps": [
        {
            "label": "",
            "method": "animate",
            "args": [
                [f"sigma_{initial_sigma:.2f}_R_{R:.2f}"],
                {"frame": {"duration": 0, "redraw": True},
                 "mode": "immediate"}
            ],
        }
        for R in R_range
    ],
    "font": {"size": 20, "family": "Arial", "color": "black"},
}

fig.update_layout(
    sliders=[sigma_slider, R_slider],
    title="Heat Map",
    title_x=0.5,
    autosize=False,        # prevents resize glitch
    width=800,
    height=800,
    xaxis=dict(
        title="x",
        range=[-axis_range, axis_range],
        constrain='domain'
    ),
    yaxis=dict(
        title="y",
        range=[-axis_range, axis_range],
        scaleanchor='x'
    )
)

fig.show()

#fig.write_html("warp_drive_radius.html", include_plotlyjs="cdn")
#print("Saved warp_drive_slider.html")
fig.show()
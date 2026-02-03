import pandas as pd
import numpy as np
import plotly.graph_objects as go

def findRadius(x, y):
    square = x**2 + y**2
    return np.sqrt(square)

def shapeFunction(r, sigma, R):
    numerator = np.tanh(sigma*(r + R)) - np.tanh(sigma*(r - R))
    denominator = 2*np.tanh(sigma*R)
    return numerator/denominator

def generateFrame(sigma, R, range_limit, name):
    x_values = np.linspace(-range_limit, range_limit, 100)
    y_values = np.linspace(-range_limit, range_limit, 100)
    X, Y = np.meshgrid(x_values, y_values)
    map_values = shapeFunction(findRadius(X, Y), sigma, R)
    return go.Frame(data=go.Heatmap(z=map_values, x=x_values, y=y_values, colorscale='Inferno',
        colorbar=dict(title='Value')), name=name)

axis_range = 5
sigma_range = np.linspace(0.5, 5, 30)
frames = []

for i in range(len(sigma_range)):
    sigma_val = sigma_range[i]
    frames.append(generateFrame(sigma_val, 1.5, axis_range, sigma_val))

fig = go.Figure(data=frames[0].data, frames=frames).update_layout(
    sliders=[{"steps": [{"args": [[f.name],{"frame": {"duration": 0, "redraw": True},
                                            "mode": "immediate",},],
                         "label": f.name, "method": "animate",}
                        for f in frames],}],
    height=800,
    xaxis={"tickangle": 45, 'side': 'top'},
    title_x=0.5,

)

fig.update_layout(
    title='Heat Map',
    xaxis_title='x',
    yaxis_title='y',
    yaxis_scaleanchor='x',
    xaxis=dict(
        range=[-axis_range, axis_range],
        constrain='domain'
    ),
    yaxis=dict(
        range=[axis_range, axis_range],
        constrain='domain'
    )
)

fig.show()
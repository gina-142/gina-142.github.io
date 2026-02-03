# THE GRAPH IS CHATGPT GENERATED TO TEST IMPLEMENTING A GRAPH IN THE WESITE

import numpy as np
import plotly.graph_objects as go

# Create data
x = np.linspace(0, 2 * np.pi, 500)
initial_freq = 1.0
y = np.sin(initial_freq * x)

# Create figure
fig = go.Figure()

# Add the sine wave trace
fig.add_trace(go.Scatter(x=x, y=y, mode='lines', name='sin(f*x)'))

# Add slider for frequency
slider_steps = []
for f in np.linspace(0.1, 10, 100):  # slider from 0.1 to 10 Hz
    y_new = np.sin(f * x)
    step = dict(
        method='update',
        args=[{'y': [y_new]},  # update the y data
              {'title': f'Frequency: {f:.2f} Hz'}],
        label=f'{f:.1f}'
    )
    slider_steps.append(step)

sliders = [dict(
    active=9,  # initial slider position (10th step, approx 1 Hz)
    currentvalue={"prefix": "Frequency: "},
    pad={"t": 50},
    steps=slider_steps
)]

fig.update_layout(
    title=f'Sine Wave with Frequency {initial_freq} Hz',
    sliders=sliders,
    xaxis_title='x',
    yaxis_title='sin(f * x)'
)

fig.write_html("interactive_sine.html", auto_open=True)

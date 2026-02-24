import numpy as np
import plotly.graph_objects as go

def wormhole_embedding(b0=1.0, r_max=6.0, n_r=220, n_phi=220):
    """
    Morris–Thorne wormhole embedding diagram for b(r)=b0^2/r:
      z(r) = ± b0 * arcosh(r/b0)
    """
    r = np.linspace(b0 * 1.0001, r_max, n_r)  # avoid exactly r=b0
    phi = np.linspace(0, 2*np.pi, n_phi)
    R, PHI = np.meshgrid(r, phi)

    Z = b0 * np.arccosh(R / b0)
    X = R * np.cos(PHI)
    Y = R * np.sin(PHI)
    return X, Y, Z

# Choose slider values for throat radius b0
b0_values = [0.6, 0.8, 1.0, 1.3, 1.6, 2.0]
r_max = 6.0

# Build frames 
frames = []
for b0 in b0_values:
    X, Y, Z_top = wormhole_embedding(b0=b0, r_max=r_max)
    Z_bottom = -Z_top
    frames.append(
        go.Frame(
            name=f"b0={b0}",
            data=[
                go.Surface(x=X, y=Y, z=Z_top, showscale=False),
                go.Surface(x=X, y=Y, z=Z_bottom, showscale=False),
            ],
        )
    )

# Start on b0=1.0 if available, else first
start_b0 = 1.0 if 1.0 in b0_values else b0_values[0]
start_frame = next(f for f in frames if f.name == f"b0={start_b0}")

fig = go.Figure(data=start_frame.data, frames=frames)

# Slider steps: jump to a frame
steps = []
for b0 in b0_values:
    steps.append(
        dict(
            method="animate",
            label=f"{b0}",
            args=[
                [f"b0={b0}"],
                dict(
                    mode="immediate",
                    frame=dict(duration=0, redraw=True),
                    transition=dict(duration=0),
                ),
            ],
        )
    )

fig.update_layout(
    title="Morris–Thorne Wormhole (Interactive Throat Radius b₀)",
    scene=dict(
    xaxis=dict(
        title="x",
        showticklabels=False,
        ticks="",
        showgrid=False,
        zeroline=False,
    ),
    yaxis=dict(
        title="y",
        showticklabels=False,
        ticks="",
        showgrid=False,
        zeroline=False,
    ),
    zaxis=dict(
        title="z",
        showticklabels=False,
        ticks="",
        showgrid=False,
        zeroline=False,
    ),
    aspectmode="data",
),
    margin=dict(l=0, r=0, t=55, b=0),
    sliders=[dict(
        active=b0_values.index(start_b0) if start_b0 in b0_values else 0,
        currentvalue=dict(prefix="Throat radius b₀ = "),
        pad=dict(t=30),
        steps=steps
    )],
)

fig.write_html("wormhole_slider.html", include_plotlyjs="cdn")
print("Saved wormhole_slider.html")

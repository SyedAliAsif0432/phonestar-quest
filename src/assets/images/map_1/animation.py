from PIL import Image, ImageEnhance

# Load your image
input_path = "glowbug_glade.png"
output_path = "glowbug_animation.gif"
original = Image.open(input_path).convert("RGBA")

# Create animation frames
frames = []
for i in range(10):
    # Pulse brightness factor between 0.7 and 1.0
    factor = 0.7 + 0.3 * abs((i % 10) - 5) / 5
    enhancer = ImageEnhance.Brightness(original)
    frame = enhancer.enhance(factor)
    frames.append(frame)

# Save as an animated GIF
frames[0].save(
    output_path,
    save_all=True,
    append_images=frames[1:],
    duration=100,
    loop=0
)


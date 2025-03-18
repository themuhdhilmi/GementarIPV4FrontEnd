# Use the official Node.js image
FROM node:latest AS base

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line if you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Create the nodejs user
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 --gid nodejs nextjs

# Copy built files from Jenkins (assumed built and located in a folder like /path/to/your/build)
COPY --from=builder /build/.next/standalone ./standalone
COPY --from=builder /build/.next/static ./static
COPY --from=builder /build/public ./public

# Set the right permissions
RUN chown -R nextjs:nodejs ./

# Switch to the nextjs user
USER nextjs

# Expose port 3000 (adjust if needed)
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Run the app (assuming the build has the necessary server.js)
CMD ["node", "server.js"]

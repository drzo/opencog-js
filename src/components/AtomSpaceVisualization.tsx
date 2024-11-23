import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SystemData, systems } from '../data/systems';

interface AtomSpaceVisualizationProps {
  isDarkMode: boolean;
}

export const AtomSpaceVisualization: React.FC<AtomSpaceVisualizationProps> = ({ isDarkMode }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;
    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll('*').remove();

    // Create container for zoomable content
    const container = svg.append('g');

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    // Apply zoom to SVG
    svg.call(zoom);

    // Create force simulation
    const simulation = d3.forceSimulation(systems.nodes)
      .force('link', d3.forceLink(systems.links).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Create links
    const links = container.append('g')
      .selectAll('line')
      .data(systems.links)
      .join('line')
      .attr('stroke', isDarkMode ? '#666' : '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => d.value);

    // Create nodes
    const nodes = container.append('g')
      .selectAll('circle')
      .data(systems.nodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', d => d.color)
      .call(drag(simulation));

    // Add node labels
    const labels = container.append('g')
      .selectAll('text')
      .data(systems.nodes)
      .join('text')
      .text(d => d.name)
      .attr('font-size', '12px')
      .attr('fill', isDarkMode ? '#fff' : '#000')
      .attr('text-anchor', 'middle')
      .attr('dy', 20);

    // Add tooltips
    nodes.append('title')
      .text(d => d.description);

    // Update positions on simulation tick
    simulation.on('tick', () => {
      links
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      nodes
        .attr('cx', d => d.x!)
        .attr('cy', d => d.y!);

      labels
        .attr('x', d => d.x!)
        .attr('y', d => d.y!);
    });

    // Initial zoom transform
    const initialTransform = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(0.8)
      .translate(-width / 2, -height / 2);
    
    svg.call(zoom.transform, initialTransform);

    // Double-click to reset zoom
    svg.on('dblclick.zoom', () => {
      svg.transition()
        .duration(750)
        .call(zoom.transform, initialTransform);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [isDarkMode]);

  return (
    <svg 
      ref={svgRef} 
      width="800" 
      height="600" 
      className={`w-full border rounded-lg ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}
    />
  );
};

// Drag behavior for nodes
function drag(simulation: d3.Simulation<any, undefined>) {
  function dragstarted(event: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event: any) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event: any) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
}